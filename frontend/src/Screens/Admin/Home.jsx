/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  useEffect(() => {
    getStudentCount();
    getFacultyCount();
  }, []);

  const getStudentCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            studentCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFacultyCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            facultyCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {load && (
        <>
          <Navbar />
          <div className="max-w-6xl mx-auto">
            {/* Toggle Button for Mobile */}
            <button
              className="md:hidden p-2 bg-blue-500 text-white rounded-md mx-4 my-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰ Menu
            </button>

            {/* Menu List */}
            <ul
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:flex justify-evenly items-center gap-10 w-full mx-auto my-8`}
            >
              {[
                "Profile",
                "Student",
                "Faculty",
                "Branch",
                "Notice",
                "Subjects",
                "Admin",
              ].map((menu) => (
                <li
                  key={menu}
                  className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                    selectedMenu === menu
                      ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                      : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                  }`}
                  onClick={() => {
                    setSelectedMenu(menu);
                    setIsMenuOpen(false); // Close menu on item click in mobile view
                  }}
                >
                  {menu}
                </li>
              ))}
            </ul>

            {/* Render Selected Component */}
            <>
              {selectedMenu === "Branch" && <Branch />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "Student" && <Student />}
              {selectedMenu === "Faculty" && <Faculty />}
              {selectedMenu === "Subjects" && <Subjects />}
              {selectedMenu === "Admin" && <Admin />}
              {selectedMenu === "Profile" && <Profile />}
            </>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
