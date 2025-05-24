import "dotenv/config.js";
import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// --- Socket.IO setup ---
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
app.set("io", io); // Make io available in routes

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
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
