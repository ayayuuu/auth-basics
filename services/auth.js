// const sessionIdToUserMap=new Map();

import jwt from 'jsonwebtoken';
const secret='a676767';

function setUser(user){
    // sessionIdToUserMap.set(id,user);
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret);
}

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

function getUser(token){
    if(!token) return null;
    try{
    return jwt.verify(token,secret);
    }catch(err){
        return null;
    }
}

export {setUser,getUser};