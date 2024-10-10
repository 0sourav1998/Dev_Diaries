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
import { UpdateBlog } from "./components/UpdateBlog";
import { Footer } from "./components/common/Footer";
import { EmailVerification } from "./components/EmailVerification";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#181a2a]">
      <Navbar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/forgot-password/:token" element={<ResetPassword/>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/dashboard" element={<MyDashboard />}>
            <Route path="myBlogs" element={<MyBlogs />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="update/:id" element={<UpdateBlog />} />
            <Route path="chart" element={<Chart />} />
            <Route path="me" element={<MyProfile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
