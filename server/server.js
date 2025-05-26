import "dotenv/config.js";
import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);

// --- Socket.IO setup ---
const io = new Server(server, {
  cors: {
    origin: [
      "https://worksphere-peach.vercel.app", // <-- no trailing slash
      "https://worksphere-2.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.set("io", io); // Make io available in routes

// Middleware
app.use(
  cors({
    origin: [
      "https://worksphere-peach.vercel.app", // your Vercel frontend
      "https://worksphere-2.onrender.com", // your backend (optional, for testing)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // Ensure you have a .env file with MONGO_URI set
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Serve React Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));

// Fix for React Routes (e.g., /login)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Health check & start
app.get("/", (req, res) => res.send("API is running…"));

// --- Socket.IO connection event ---
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (userId) => {
    console.log(`User ${userId} joined room`);
    socket.join(userId); // Join a room for the user
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
