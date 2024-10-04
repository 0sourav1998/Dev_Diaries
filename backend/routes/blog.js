import express from "express"
import { isAuthenticated, isAuthor } from "../middlewares/isAuthenticated.js";
import { allBlogs, createBlog, deleteBlog, getBlogById, getMyBlogs, latestBlogs, updateBlog } from "../controllers/blog.js";
const router = express.Router();


router.post("/post",isAuthenticated,isAuthor,createBlog);
router.delete("/delete/:id",isAuthenticated,isAuthor,deleteBlog)
router.get("/all",allBlogs)
router.get("/singleBlog/:id",isAuthenticated,getBlogById)
router.get("/myBlogs",isAuthenticated,isAuthor,getMyBlogs)
router.put("/update/:id",isAuthenticated,isAuthor,updateBlog)
router.get("/latestBlogs",latestBlogs)

export default router ;
