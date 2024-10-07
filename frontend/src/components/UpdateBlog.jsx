import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/RS_DummyImage.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFetchBlogById } from "../redux/slice/blog";
import toast from "react-hot-toast";
import { updateBlog } from "../services/operations/blogs";

export const UpdateBlog = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const imageTwoRef = useRef();
  const imageThreeRef = useRef();
  const imageFourRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState("");
  const [imagePreviewTwo, setImagePreviewTwo] = useState("");
  const [imagePreviewThree, setImagePreviewThree] = useState("");
  const [imagePreviewFour, setImagePreviewFour] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const { fetchBlogById } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    category: "",
    title: "",
    description: "",
    image: null,
    titleTwo: "",
    descriptionTwo: "",
    imageTwo: null,
    titleThree: "",
    descriptionThree: "",
    imageThree: null,
    titleFour: "",
    descriptionFour: "",
    imageFour: null,
  });

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      setInput({ ...input, image: image });
    }
  };

  const handleFileTwoChange = (e) => {
    const imageTwo = e.target.files[0];
    if (imageTwo) {
      const url = URL.createObjectURL(imageTwo);
      setImagePreviewTwo(url);
      setInput({ ...input, imageTwo: imageTwo });
    }
  };

  const handleFileThreeChange = (e) => {
    const imageThree = e.target.files[0];
    if (imageThree) {
      const url = URL.createObjectURL(imageThree);
      setImagePreviewThree(url);
      setInput({ ...input, imageThree: imageThree });
    }
  };

  const handleFileFourChange = (e) => {
    const imageFour = e.target.files[0];
    if (imageFour) {
      const url = URL.createObjectURL(imageFour);
      setImagePreviewFour(url);
      setInput({ ...input, imageFour: imageFour });
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `https://dev-diaries-2.onrender.com/api/v1/blog/singleBlog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        const blog = response?.data?.blog;
        setInput((prevInput) => ({
          ...prevInput,
          category: blog?.category || "",
          title: blog?.title || "",
          description: blog?.description || "",
          image: blog?.image || null,
          titleTwo: blog?.titleTwo || "",
          descriptionTwo: blog?.descriptionTwo || "",
          imageTwo: blog?.imageTwo || null,
          titleThree: blog?.titleThree || "",
          descriptionThree: blog?.descriptionThree || "",
          imageThree: blog?.imageThree || null,
          titleFour: blog?.titleFour || "",
          descriptionFour: blog?.descriptionFour || "",
          imageFour: blog?.imageFour || null,
        }));
        setImagePreviewTwo(blog?.imagePreviewTwo || logo);
        setImagePreviewThree(blog?.imagePreviewThree || logo);
        setImagePreviewFour(blog?.imagePreviewFour || logo);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  

  useEffect(() => {
    fetchBlog();
  }, [id,fetchBlogById]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      console.log("ID", id);
      formData.append("id", id);
      formData.append("category", input.category);
      formData.append("published", true);
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("image", input.image);

      formData.append("titleTwo", input.titleTwo);
      formData.append("descriptionTwo", input.descriptionTwo);
      formData.append("imageTwo", input.imageTwo);

      formData.append("titleThree", input.titleThree);
      formData.append("descriptionThree", input.descriptionThree);
      formData.append("imageThree", input.imageThree);

      formData.append("titleFour", input.titleFour);
      formData.append("descriptionFour", input.descriptionFour);
      formData.append("imageFour", input.imageFour);

      setLoading(true);
      const res = await updateBlog(formData, token);
      if (res?.data?.success) {
        toast.success("Blog Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex md:flex-row flex-col gap-12 mb-10">
      <div className="md:w-[50%] w-full">
        <div>
          <select
            className="bg-gray-800 text-gray-600 md:p-2 p-1 border-b"
            onChange={(e) => setInput({ ...input, category: e.target.value })}
            value={input?.category}
          >
            <option value="">Select A Category</option>
            <option value="Health & Food">Health & Food</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Economics">Economics</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-2 mt-4">
          <label className="text-gray-400 md:text-xl text-sm">Title Of The Blog</label>
          <input
            value={input?.title}
            className="w-full p-2 bg-gray-600 text-gray-400"
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </div>
        <div className="w-full flex flex-col gap-2 mt-4">
          <label className="text-gray-400 md:text-xl text-sm">
            Description Of The Blog
          </label>
          <textarea
            rows={7}
            value={input?.description}
            className="w-full p-2 bg-gray-600 text-gray-400"
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </div>
        <div className="mt-4">
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={handleFileChange}
          />
          {imagePreview !== null ? (
            <img src={imagePreview} className="w-full h-36" />
          ) : (
            <img src={logo} className="w-full h-36" />
          )}
          <button
            onClick={() => imageRef.current.click()}
            className="w-full bg-blue-600 rounded-md text-gray-300 md:p-3 p-1  mt-2"
          >
            Choose A Image
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 rounded-md text-gray-300 md:p-3 p-1  mt-2"
        >
          {loading ? "Loading..." : "Update Blog"}
        </button>
      </div>

      {/* Not Mandatory Fields */}
      <div className="md:w-[50%] w-full">
        {/* Image Two */}
        <div className="mb-4">
          <label className="text-gray-400 md:text-xl text-sm">Title Two</label>
          <input
            value={input.titleTwo}
            onChange={(e) => setInput({ ...input, titleTwo: e.target.value })}
            className="w-full p-1 bg-gray-600 text-gray-400"
          />
          <label className="text-gray-400 md:text-xl text-sm mt-2">Description Two</label>
          <textarea
            value={input.descriptionTwo}
            onChange={(e) =>
              setInput({ ...input, descriptionTwo: e.target.value })
            }
            rows={3}
            className="w-full p-1 bg-gray-600 text-gray-400"
          />
          <input
            type="file"
            className="hidden"
            ref={imageTwoRef}
            onChange={handleFileTwoChange}
          />
          {console.log("imagePreviewTwo",imagePreviewTwo)}
          {imagePreviewTwo && (
            <img src={imagePreviewTwo} className="h-28 w-full" />
          )}
          <button
            onClick={() => imageTwoRef.current.click()}
            className="text-gray-300 bg-blue-500 p-2 w-full"
          >
            Choose An Image
          </button>
        </div>

        {/* Image Three */}
        <div className="mb-4">
          <label className="text-gray-400 md:text-xl text-sm">Title Three</label>
          <input
            value={input.titleThree}
            onChange={(e) => setInput({ ...input, titleThree: e.target.value })}
            className="w-full p-1 bg-gray-600 text-gray-400"
          />
          <label className="text-gray-400 md:text-xl text-sm mt-2">
            Description Three
          </label>
          <textarea
            value={input.descriptionThree}
            onChange={(e) =>
              setInput({ ...input, descriptionThree: e.target.value })
            }
            rows={3}
            className="w-full p-1 bg-gray-600 text-gray-400"
          />
          <input
            type="file"
            className="hidden"
            ref={imageThreeRef}
            onChange={handleFileThreeChange}
          />
          {imagePreviewThree && (
            <img src={imagePreviewThree} className="h-28 w-full" />
          )}
          <button
            onClick={() => imageThreeRef.current.click()}
            className="text-gray-300 bg-blue-500 p-2 w-full"
          >
            Choose An Image
          </button>
        </div>

        {/* Image Four */}
        <div className="mb-4">
          <label className="text-gray-400 md:text-xl text-sm">Title Four</label>
          <input
            value={input.titleFour}
            onChange={(e) => setInput({ ...input, titleFour: e.target.value })}
            className="w-full p-1 bg-gray-600 text-gray-400"
          />
          <label className="text-gray-400 md:text-xl text-sm mt-2">Description Four</label>
          <textarea
            value={input.descriptionFour}
            onChange={(e) =>
              setInput({ ...input, descriptionFour: e.target.value })
            }
            rows={3}
            className="w-full p-1 bg-gray-600 text-gray-400"
          />
          <input
            type="file"
            className="hidden"
            ref={imageFourRef}
            onChange={handleFileFourChange}
          />
          {imagePreviewFour && (
            <img src={imagePreviewFour} className="h-28 w-full" />
          )}
          <button
            onClick={() => imageFourRef.current.click()}
            className="text-gray-300 bg-blue-500 p-2 w-full"
          >
            Choose An Image
          </button>
        </div>
      </div>
    </div>
  );
};
