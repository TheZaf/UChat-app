import express from "express";
import { signUp ,logIn, logOut,updateProfile, checkAuth} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middleware/middleware.js";

const router = express.Router();

router.post("/signup",signUp)
router.post("/login",logIn)
router.post("/logout",logOut)

router.put("/update-profile",protectedRoute,updateProfile)

router.get("/check",protectedRoute,checkAuth)

export default router;