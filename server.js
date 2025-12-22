import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

/* Model Registration */
app.post("/api/register", (req, res) => {
  const { name, mobile, email, experience } = req.body;

  if (!name || !mobile || !email || !experience) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO model_registration (name, mobile, email, experience) VALUES (?, ?, ?, ?)",
    [name, mobile, email, experience],
    err => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "Saved" });
    }
  );
});

/* Instagram Registration */
app.post("/api/instagram-register", (req, res) => {
  console.log("Instagram API hit:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO instagram_details (username, password) VALUES (?, ?)",
    [username, password],
    err => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Saved" });
    }
  );
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port ${PORT}");
});