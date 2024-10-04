import Blog from "../models/blogSchema.js";
import { sendFileToCloudinary } from "../utils/sendFileToCloudinary.js";

export const createBlog = async (req, res) => {
  try {
    if (!req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Main Image For the Blog is Mandatory",
      });
    }
    const { image, imageTwo, imageThree, imageFour } = req.files;
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    if (
      !allowedFormats.includes(image.mimetype) ||
      (imageTwo && !allowedFormats.includes(imageTwo.mimetype)) ||
      (imageThree && !allowedFormats.includes(imageThree.mimetype)) ||
      (imageFour && !allowedFormats.includes(imageFour.mimetype))
    ) {
      return res.status(400).json({
        success: false,
        message:
          "We Cannot accept these file type , Only jpg , png , webp are allowed",
      });
    }
    const {
      title,
      description,
      category,
      published,
      titleTwo,
      descriptionTwo,
      titleThree,
      descriptionThree,
      titleFour,
      descriptionFour,
    } = req.body;
    console.log(published)
    const authorId = req.user;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "These Two fields are required",
      });
    }
    const uploadResults = await Promise.all([
      sendFileToCloudinary(image, process.env.CLOUDINARY_BLOG_FOLDER),
      imageTwo &&
        sendFileToCloudinary(imageTwo, process.env.CLOUDINARY_BLOG_FOLDER),
      imageThree &&
        sendFileToCloudinary(imageThree, process.env.CLOUDINARY_BLOG_FOLDER),
      imageFour &&
        sendFileToCloudinary(imageFour, process.env.CLOUDINARY_BLOG_FOLDER),
    ]);

    const mainImageURL = uploadResults[0].secure_url;
    const imageTwoURL = uploadResults[1]?.secure_url || null;
    const imageThreeURL = uploadResults[2]?.secure_url || null;
    const imageFourURL = uploadResults[3]?.secure_url || null;

    await Blog.create({
      title,
      description,
      image: mainImageURL,
      titleTwo: titleTwo ? titleTwo : "",
      descriptionTwo: descriptionTwo ? descriptionTwo : "",
      imageTwo: imageTwoURL,
      titleThree: titleThree ? titleThree : "",
      descriptionThree: descriptionThree ? descriptionThree : "",
      imageThree: imageThreeURL,
      titleFour: titleFour ? titleFour : "",
      descriptionFour: descriptionFour ? descriptionFour : "",
      imageFour: imageFourURL,
      authorId: authorId,
      published: published,
      category: category,
    });
    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      createBlog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Creating Blog",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.user;
    const blogId = req.params.id;
    if (!id || !blogId) {
      return res.status(400).json({
        success: false,
        message: "Both Fields Are Required",
      });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }
    const isOwner = blog.authorId.toString() === id.toString();
    if (isOwner) {
      await blog.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Blog Deleted",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You are not the owner of the blog",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Deleting the Blog",
    });
  }
};

export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).populate("authorId");
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Blogs Not Published Yet",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blogs Fetched Successfully",
      blogs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Blogs",
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("authorId");
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "No Blog Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog Fetched Successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Blog",
    });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const id = req.user;
    const myBlogs = await Blog.find({ authorId: id });
    if (!myBlogs) {
      return res.status(404).json({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "My Blogs Fetched Successfully",
      myBlogs,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching My Blogs",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    let newUpdatedBlog = ({
      title: req.body.title,
      description: req.body.description,
      titleTwo: req.body.titleTwo,
      descriptionTwo: req.body.descriptionTwo,
      titleThree: req.body.titleThree,
      descriptionThree: req.body.descriptionThree,
      titleFour: req.body.titleFour,
      descriptionFour: req.body.descriptionFour,
      category: req.body.category,
      published: req.body.published,
    } = req.body);
    if (req.files) {
      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];
      if (
        req.files.image &&
        allowedFormats.includes(req.files.image.mimetype)
      ) {
        console.log(req.files.image.mimetype);
        const response = await sendFileToCloudinary(
          req.files.image,
          process.env.CLOUDINARY_BLOG_FOLDER
        );
        newUpdatedBlog.image = response.secure_url;
      } else if (
        req.files.imageTwo &&
        allowedFormats.includes(req.files.imageTwo.mimetype)
      ) {
        console.log(req.files.imageTwo.mimetype);
        const response = await sendFileToCloudinary(
          req.files.imageTwo,
          process.env.CLOUDINARY_BLOG_FOLDER
        );
        newUpdatedBlog.imageTwo = response.secure_url;
      } else if (
        req.files.imageThree &&
        allowedFormats.includes(req.files.imageThree.mimetype)
      ) {
        console.log(req.files.imageThree.mimetype);
        const response = await sendFileToCloudinary(
          req.files.imageThree,
          process.env.CLOUDINARY_BLOG_FOLDER
        );
        newUpdatedBlog.imageThree = response.secure_url;
      } else if (
        req.files.imageFour &&
        allowedFormats.includes(req.files.imageFour.mimetype)
      ) {
        console.log(req.files.imageFour.mimetype);
        const response = await sendFileToCloudinary(
          req.files.imageFour,
          process.env.CLOUDINARY_BLOG_FOLDER
        );
        newUpdatedBlog.imageFour = response.secure_url;
      } else {
        return res.status(400).json({
          success: false,
          message: "Image Format Not Supported",
        });
      }
    }
    // if (newUpdatedBlog.title) {
    //   blog.title = newUpdatedBlog.title;
    // }
    // if (newUpdatedBlog.description) {
    //   blog.description = newUpdatedBlog.description;
    // }
    // if (newUpdatedBlog.image) {
    //   blog.image = newUpdatedBlog.image;
    // }
    // if (newUpdatedBlog.titleTwo) {
    //   blog.titleTwo = newUpdatedBlog.titleTwo;
    // }
    // if (newUpdatedBlog.descriptionTwo) {
    //   blog.descriptionTwo = newUpdatedBlog.descriptionTwo;
    // }
    // if (newUpdatedBlog.imageTwo) {
    //   blog.imageTwo = newUpdatedBlog.imageTwo;
    // }
    // if (newUpdatedBlog.titleThree) {
    //   blog.titleThree = newUpdatedBlog.titleThree;
    // }
    // if (newUpdatedBlog.descriptionThree) {
    //   blog.descriptionThree = newUpdatedBlog.descriptionThree;
    // }
    // if (newUpdatedBlog.imageThree) {
    //   blog.imageThree = newUpdatedBlog.imageThree;
    // }
    // if (newUpdatedBlog.titleFour) {
    //   blog.titleFour = newUpdatedBlog.titleFour;
    // }
    // if (newUpdatedBlog.descriptionFour) {
    //   blog.descriptionFour = newUpdatedBlog.descriptionFour;
    // }
    // if (newUpdatedBlog.imageFour) {
    //   blog.imageFour = newUpdatedBlog.imageFour;
    // }
    // if (newUpdatedBlog.category) {
    //   blog.category = newUpdatedBlog.category;
    // }
    // if (newUpdatedBlog.published) {
    //   blog.published = newUpdatedBlog.published;
    // }

    Object.keys(newUpdatedBlog).forEach((key) => {
      if (newUpdatedBlog[key]) {
        blog[key] = newUpdatedBlog[key];
      }
    });
    await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blogs Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While updating",
    });
  }
};

export const latestBlogs = async(req,res)=>{
  try {
    const Blogs = await Blog.find({published : true}).populate("authorId").sort({ createdAt : -1 });
    return res.status(200).json({
      success : true ,
      message : "Latest Blogs Fetched",
      Blogs
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Latest Blogs",
    });
  }
}
