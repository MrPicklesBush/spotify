import { connectDB } from "../lib/db.js";
import bcrypt from "bcrypt";

export const authCallback = async (req, res, next) => {
  try {
    const { id: clerkId, username, password, imageUrl } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Connect to the database
    const db = await connectDB();

    // Check if the user already exists by username
    const checkUserQuery = `SELECT * FROM User WHERE username = ?`;
    db.query(checkUserQuery, [username], async (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return next(err);
      }

      if (rows.length === 0) {
        // Signup: Insert a new user into the database
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const defaultImageUrl = imageUrl || "https://clerk.dev/static/default-avatar.png"; // Use provided image or default

        const insertQuery = `
          INSERT INTO User (username, password, clerkId, imageUrl)
          VALUES (?, ?, ?, ?)
        `;
        db.query(
          insertQuery,
          [username, hashedPassword, clerkId || null, defaultImageUrl],
          (err, result) => {
            if (err) {
              console.error("Insert error:", err);
              return next(err);
            }

            // Respond after inserting the user
            res.status(200).json({ success: true, message: "User registered successfully." });
          }
        );
      } else {
        // User already exists
        res.status(200).json({ success: true, message: "User already exists" });
      }
    });
  } catch (error) {
    console.error("Error in auth callback", error);
    next(error);
  }
};
