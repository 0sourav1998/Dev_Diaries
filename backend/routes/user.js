import express from "express"
import { getAuthors, getMyProfile, login, register, resetPassword, resetPasswordLink, sendOtp } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/register",register);
router.post("/verify-email",sendOtp);
router.post('/resetPasswordLink',resetPasswordLink);
router.post("/resetPassword",resetPassword)
router.post("/login",login)
router.post("/getProfile", isAuthenticated ,getMyProfile)
router.get("/getAuthors",getAuthors)

export default router ;
