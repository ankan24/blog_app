import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const articles = await db
      .collection("articles")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    // If the database is temporarily unavailable (for example TLS/network issues),
    // return an empty list so the admin UI can still load after login. This avoids
    // blocking navigation while you fix the MongoDB connection.
    console.error("Error fetching articles:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Protect write operations
    const token = request.cookies.get("auth-token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    const body = await request.json();
    const { title, type, content, excerpt } = body;

    if (!title || !type || !content || !excerpt) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const article = {
      title,
      type,
      content,
      excerpt,
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: false,
    };

    const result = await db.collection("articles").insertOne(article);

    return NextResponse.json(
      { ...article, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
