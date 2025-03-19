import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import { Toaster } from "react-hot-toast";
import Material from "./Material";
import Marks from "./Marks";
import Student from "./Student";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle state

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const menuItems = [
    "My Profile",
    "Student Info",
    "Upload Marks",
    "Timetable",
    "Notice",
    "Material",
  ];

  return (
    <section>
      {load && (
        <>
          <Navbar />
          <div className="max-w-6xl mx-auto">
            {/* Toggle Button for Mobile */}
            <div className="flex justify-between items-center px-4 py-3 md:hidden">
              <h2 className="text-xl font-bold">Dashboard</h2>
              <button
                className="text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Navigation Menu */}
            <ul
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:flex md:justify-evenly md:items-center gap-4 w-full mx-auto my-4 bg-white md:bg-transparent`}
            >
              {menuItems.map((menu) => (
                <li
                  key={menu}
                  className={`text-center rounded-sm px-4 py-2 cursor-pointer transition-all w-full md:w-1/5 ${
                    selectedMenu === menu
                      ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                      : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                  }`}
                  onClick={() => {
                    setSelectedMenu(menu);
                    setIsMenuOpen(false); // Close menu after selection (on mobile)
                  }}
                >
                  {menu}
                </li>
              ))}
            </ul>

            {/* Conditional Rendering */}
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Upload Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
            {selectedMenu === "Student Info" && <Student />}
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
