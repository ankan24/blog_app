#!/usr/bin/env node
/*
  Diagnostic helper for MongoDB Atlas connectivity.
  - Loads `.env.local` via dotenv
  - Prints Node + OpenSSL versions
  - Performs SRV DNS lookup for the cluster host (if using +srv)
  - Attempts a normal MongoClient.connect()
  - Attempts a connection with tlsAllowInvalidCertificates=true (for debugging only)

  Usage:
    node src/scripts/test-mongo-connection.js

  Do NOT use tlsAllowInvalidCertificates in production.
*/

const dns = require('dns');
const util = require('util');
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const resolveSrv = util.promisify(dns.resolveSrv);

async function main() {
  console.log('Node version:', process.version);
  try {
    console.log('OpenSSL version:', process.versions.openssl || 'unknown');
  } catch (e) {}

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in .env.local');
    process.exitCode = 2;
    return;
  }

  console.log('\nUsing URI:', uri.replace(/:(.*)@/, ':<redacted>@'));

  // If uri starts with mongodb+srv:// try SRV lookup
  if (uri.startsWith('mongodb+srv://')) {
    try {
      const host = uri.split('@')[1].split('/')[0];
      console.log('\nPerforming SRV lookup for', host);
      const records = await resolveSrv(`_mongodb._tcp.${host}`);
      console.log('SRV records:');
      records.forEach((r) => console.log(` - ${r.name}:${r.port} (priority=${r.priority} weight=${r.weight})`));
    } catch (err) {
      console.error('SRV lookup failed:', err.message || err);
    }
  }

  async function tryConnect(options, label) {
    const client = new MongoClient(uri, options);
    const start = Date.now();
    try {
      console.log(`\n[${label}] Attempting to connect...`);
      await client.connect();
      const ping = await client.db().admin().ping();
      console.log(`[${label}] Connected OK (ping: ${JSON.stringify(ping)}). Took ${Date.now() - start}ms`);
      await client.close();
      return true;
    } catch (err) {
      console.error(`[${label}] Connect failed:`, err && err.message ? err.message : err);
      return false;
    }
  }

  // First: normal connect
  await tryConnect({}, 'normal');

  // Second: try with tlsAllowInvalidCertificates (debug only)
  await tryConnect({ tlsAllowInvalidCertificates: true }, 'tls-bypass');

  console.log('\nDiagnostics complete.');
  console.log('If normal connection fails but tls-bypass succeeds, the issue is certificate verification (proxy, MITM, or OpenSSL mismatch).');
  console.log('Common fixes: whitelist your IP in Atlas Network Access, ensure credentials are correct, update Node to a recent version (18+), or check corporate proxy/firewall.');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exitCode = 1;
});
