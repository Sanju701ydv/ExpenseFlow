import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import expenseRoutes from "./routes/expense.routes";
import dashboardRoutes from "./routes/dashboard.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local React development
      "https://expense-flow-frontend-7jvm.onrender.com", // Production frontend
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ExpenseFlow API is Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;