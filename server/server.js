import "dotenv/config.js";
import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import adminRoutes from "./routes/admin.js";
import taskRoutes from "./routes/taskRoutes.js";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

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

// FIX: Increase body size limit for large payloads (e.g., base64 images)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://worksphere-peach.vercel.app",
      "https://worksphere-2.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
app.set("io", io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API is running…"));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (userId) => {
    console.log(`User ${userId} joined room`);
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/worksphere",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
