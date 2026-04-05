import express from "express";
const app=express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import staticRoute from "./routes/staticRouter.js";
import restrictToLoggedInUsersOnly from "./middlewares/auth.js";

app.use(express.json());
// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user",userRoute);
app.use("/",staticRoute);
app.use("/url",restrictToLoggedInUsersOnly);

app.set("view engine","ejs");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1/Auth'); //db name
}
main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{console.log(err)});

app.get("/url",(req,res)=>{
    res.render("url");
})

app.listen(8080,(req,res)=>{
    console.log("listening to port 8080");
})