require("dotenv").config();
const express = require("express");
const cors=require("cors");
const path = require("path");
const app =express();
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(
    cors({
        origin :process.env.CLIENT_URL || "*",
        methods :["GET","PUT","DELETE","POST"],
        allowedHeaders :["Content-Type" ,"Authorization"],
    })
)
app.use(express.json());

connectDB();

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);


app.get("/", (req, res) => {
  res.send("Server is up and running!🏃 at localhost:8000");
});

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`);});