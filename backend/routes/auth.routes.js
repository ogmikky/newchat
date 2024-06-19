import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import multerUploads from '../utils/multerUpload.js';


const router = express.Router();

router.post("/signup", multerUploads.single("image"), signup);
router.post("/login", login);
router.post("/logout", logout);


export default router;