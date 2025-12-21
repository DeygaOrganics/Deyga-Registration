import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

import express, { json } from "express";
import { createConnection } from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

// MySQL connection
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

export default db;

/* -----------------------------------
   1️⃣ Deyga Model Registration API
----------------------------------- */
app.post("/api/register", (req, res) => {
  const { name, mobile, email, experience } = req.body;

  if (!name || !mobile || !email || !experience) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = `
    INSERT INTO model_registration (name, mobile, email, experience)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, mobile, email, experience], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Registration successful" });
  });
});

/* -----------------------------------
   2️⃣ Instagram-style Username + Email API
----------------------------------- */
app.post("/api/instagram-register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = `
    INSERT INTO instagram_users (username, password)
    VALUES (?, ?)
  `;

  db.query(sql, [username, password], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Saved successfully" });
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('🚀 Server running on port ${PORT}');
});