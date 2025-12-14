require("dotenv").config();
const express = require('express')
const cors = require('cors');
const connectDB = require('./Database/db');
const authRoutes = require("./API/authRoutes")
const planRoutes = require("./API/planRoutes")






const app = express();

// db connenct
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);



app.get('/',(req,res)=>{
    res.send("FitPlanHub Backend Running")
});


app.listen(5000,()=>{
    console.log("server Stared on Port 5000")
});