import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./components/Homepage";
import { Navbar } from "./components/common/Navbar";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Blogs } from "./components/Blogs";
import { AllAuthors } from "./components/AllAuthors";
import { AboutPage } from "./components/AboutPage";
import { SingleBlog } from "./components/SingleBlog";
import { MyDashboard } from "./components/MyDashboard";
import { MyBlogs } from "./components/MyBlogs";
import { CreateBlog } from "./components/CreateBlog";
import { Chart } from "./components/Chart";
import { MyProfile } from "./components/MyProfile";

function App() {
  return (
    <div className="bg-[#181a2a] overflow-x-auto h-screen w-screen">
      <Navbar className="h-[20%]" />
      <div className="h-[80%] p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/dashboard" element={<MyDashboard />}>
            <Route path="myBlogs" element={<MyBlogs />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="chart" element={<Chart />} />
            <Route path="me" element={<MyProfile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
