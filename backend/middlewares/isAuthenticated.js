import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log("here");
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token Not Found",
      });
    }
    console.log(token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODE", decode);
    req.user = decode._id;
    req.role = decode.role;
    console.log(req.user, req.role);
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export const isAuthor = async (req, res, next) => {
  try {
    const role = req.role;
    if (role !== "Author") {
      return res.status(400).json({
        success:
          "You Are Not An Author , You Don't have the permission to access the route",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While" + error.message,
    });
  }
};
