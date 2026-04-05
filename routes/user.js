import express from "express";
import {handleUserSignup} from "../controllers/user.js";
import {handleUserLogin} from "../controllers/user.js";
const router=express.Router();

router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);

export default router;
