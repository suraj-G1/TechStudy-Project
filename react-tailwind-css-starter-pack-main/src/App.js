import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Navbar from "./components/common/Navbar";
import Login from "../src/pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Signup from "./pages/Signup";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter w-9/12">
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

       <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />

      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      
      {
        user?.accountType === "Student" && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

{
        user?.accountType === 'Instructor' && (
          <>
              <Route path='dashboard/add-course' element={<AddCourse/>}/>

              
          </>
        )
      }



      </Routes>
    </div>
  );
}

export default App;
