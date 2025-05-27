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

// Place CORS middleware at the very top, before any routes or other middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://worksphere-peach.vercel.app",
      "https://worksphere-2.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Enable CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "https://worksphere-peach.vercel.app", // <-- no trailing slash
      "https://worksphere-2.onrender.com",
      "http://localhost:5173", // allow your frontend origin
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.set("io", io); // Make io available in routes

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // Ensure you have a .env file with MONGO_URI set
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

// Test route for CORS
app.get("/cors-test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
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
