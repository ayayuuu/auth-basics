import User from "../models/user.js";
import {v4 as uuidv4} from "uuid";
import {setUser} from "../services/auth.js";
import bcrypt from "bcrypt";

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password:hashedPassword
    });
    return res.render("home");
}
catch(err){
    return res.status(400).send("Server error");
}
}

async function handleUserLogin(req,res){
    const{email,password}=req.body;
    try{
        const user=await User.findOne({
            email:email,
        })
        if(!user) return res.status(400).send("user not found");
    //     if (user.password !== password) {
    //     return res.status(400).send("Invalid credentials");
    // }
    const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

    // const sessionId=uuidv4();
    // setUser(sessionId,user);
    // res.cookie("uid",sessionId);
    req.session.userId = user._id;

    return res.render("home", { user });
    } catch(err){
        return res.status(500).send("server error");
    }
}

export {handleUserLogin,handleUserSignup};//default wont be written check why