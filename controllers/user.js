import User from "../models/user.js";
import {v4 as uuidv4} from "uuid";
import {setUser} from "../services/auth.js";

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,email,password
    });
    return res.render("home")
}

async function handleUserLogin(req,res){
    const{email,password}=req.body;
    try{
        const user=await User.findOne({
            email:email,
        })
        if(!user) return res.status(400).send("user not found");
        if (user.password !== password) {
        return res.status(400).send("Invalid credentials");
    }

    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);

    return res.render("home", { user });
    } catch(err){
        return res.status(500).send("server error");
    }
}

export {handleUserLogin,handleUserSignup};//default wont be written check why