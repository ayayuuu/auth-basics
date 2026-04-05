// import {getUser} from "../services/auth.js";
import User from "../models/user.js";

async function restrictToLoggedInUsersOnly(req,res,next){
    // const userUid=req.cookies.uid;
    const userUid = req.session.userId;

    if(!userUid) return res.redirect("/login");
    // const user=getUser(userUid);
    const user=await User.findById(userUid);
    if(!user) return res.redirect("/login");
    
    req.user=user;
    next();
}

export default restrictToLoggedInUsersOnly;