//packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"
//Importing Routes
import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.route.js';
import { connectDB } from '../db/db.js';
import { app ,server} from '../lib/socket.js';
//App initialization
dotenv.config();
const PORT =process.env(PORT)
const __dirname=path.resolve()

//Middleware
app.use(express.json());
app.use(
  cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Routes
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

app.get("/",(req,res)=>{
    res.status(200).send("Server is running...")
});

//Starting server
server.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port :'+ PORT);
});