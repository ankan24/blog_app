import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

interface AdminUser {
  email: string;
  password: string;
}

function getAdminUsers(): AdminUser[] {
  try {
    const usersJson = process.env.ADMIN_USERS;
    if (!usersJson) {
      return [
        {
          email: "emily@gmail.com",
          password: "emily123",
        },
        {
          email: "admin@gmail.com",
          password: "admin123",
        },
      ];
    }
    return JSON.parse(usersJson);
  } catch (error) {
    console.error("Error parsing admin users:", error);
    return [];
  }
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminUsers = getAdminUsers();
  const user = adminUsers.find((u) => u.email === email);

  if (!user) {
    return false;
  }

  // If the stored password looks like a bcrypt hash, use bcrypt.compare
  try {
    const stored = user.password || "";
    if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
      return await bcrypt.compare(password, stored);
    }

    // Fallback: plain-text comparison (acceptable for small, manual lists but not recommended)
    return stored === password;
  } catch (err) {
    console.error("Error validating credentials:", err);
    return false;
  }
}

export function generateToken(email: string): string {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
  return token;
}

export function verifyToken(token?: string | null): { email: string } | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAdminEmails(): string[] {
  return getAdminUsers().map((u) => u.email);
}
