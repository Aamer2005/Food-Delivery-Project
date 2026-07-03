import express from "express";
import cors from "cors";
import dns from "dns";
import 'dotenv/config'

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use("/images", express.static("uploads"));

// Database
connectDB();

// Routes
app.use("/api/food", foodRouter);
//app.use("/images",express.static('uploads'))//shows food images
app.use("/api/user",userRouter);

app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
