import express from "express"
import { getAuthors, getMyProfile, login, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/register",register);
router.post("/login",login)
router.post("/getProfile", isAuthenticated ,getMyProfile)
router.get("/getAuthors",getAuthors)
export default router ;
