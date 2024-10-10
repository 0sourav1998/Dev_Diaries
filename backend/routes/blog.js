import express from "express"
import { isAuthenticated, isAuthor } from "../middlewares/isAuthenticated.js";
import { allBlogs, createBlog, deleteBlog, getBlogById, getMyBlogs, latestBlogs, updateBlog } from "../controllers/blog.js";
import { sendOtp } from "../controllers/user.js";
const router = express.Router();


router.post("/post",isAuthenticated,isAuthor,createBlog);
router.delete("/delete",isAuthenticated,isAuthor,deleteBlog);
router.get("/all",allBlogs);
router.get("/singleBlog/:id",isAuthenticated,getBlogById);
router.get("/myBlogs",isAuthenticated,isAuthor,getMyBlogs);
router.put("/update",isAuthenticated,isAuthor,updateBlog);
router.get("/latestBlogs",latestBlogs);


export default router ;
