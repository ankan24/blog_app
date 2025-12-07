import { MongoClient, Db, ObjectId } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let fallbackLogged = false;

/**
 * connectToDatabase
 * - attempts to connect to MongoDB Atlas using the MONGODB_URI env var
 * - on success returns the connected client and db
 * - on failure (for example TLS/Network errors) it returns a lightweight
 *   in-memory fallback implementation so the app can continue to operate
 *   (useful for local development when Atlas isn't reachable).
 */
export async function connectToDatabase(): Promise<{ client: MongoClient | null; db: Db | any }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();

    const db = client.db("emily-writes");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    // Log a friendly message with actionable next steps and return a fallback
    // in-memory DB so the app doesn't crash during development when the
    // Atlas connection fails (for example due to IP whitelist or TLS issues).
    if (!fallbackLogged) {
      console.error("Database connection error:", error);
      console.error(
        "Falling back to an in-memory mock DB. To fix the connection, check your MONGODB_URI, Atlas Network Access (IP whitelist), and Node/OpenSSL versions."
      );
      fallbackLogged = true;
    }

    // Lightweight in-memory fallback implementing the minimal collection methods used by the app
    const fallbackDb = {
      collection: (name: string) => ({
        find: (query: any) => ({
          sort: (_: any) => ({
            toArray: async () => [] as any[],
          }),
        }),
        findOne: async (_q: any) => null,
        insertOne: async (doc: any) => ({ insertedId: new ObjectId() }),
        updateOne: async (_q: any, _u: any) => ({ modifiedCount: 0 }),
        deleteOne: async (_q: any) => ({ deletedCount: 0 }),
      }),
    };

    return { client: null, db: fallbackDb };
  }
}
