import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);
  return (
    <section>
  {load && (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        {/* Toggle Button for Mobile */}
        <div className="md:hidden flex justify-end my-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile-friendly navigation menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-10 w-full mx-auto my-8`}
        >
          <li
            className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
              selectedMenu === "My Profile"
                ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setSelectedMenu("My Profile");
              setIsMenuOpen(false); // Close menu on mobile after selection
            }}
          >
            My Profile
          </li>
          <li
            className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
              selectedMenu === "Timetable"
                ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setSelectedMenu("Timetable");
              setIsMenuOpen(false); // Close menu on mobile after selection
            }}
          >
            Timetable
          </li>
          <li
            className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
              selectedMenu === "Marks"
                ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setSelectedMenu("Marks");
              setIsMenuOpen(false); // Close menu on mobile after selection
            }}
          >
            Marks
          </li>
          <li
            className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
              selectedMenu === "Material"
                ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setSelectedMenu("Material");
              setIsMenuOpen(false); // Close menu on mobile after selection
            }}
          >
            Material
          </li>
          <li
            className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
              selectedMenu === "Notice"
                ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setSelectedMenu("Notice");
              setIsMenuOpen(false); // Close menu on mobile after selection
            }}
          >
            Notice
          </li>
        </ul>

        {/* Content based on selected menu */}
        {selectedMenu === "Timetable" && <Timetable />}
        {selectedMenu === "Marks" && <Marks />}
        {selectedMenu === "Material" && <Material />}
        {selectedMenu === "Notice" && <Notice />}
        {selectedMenu === "My Profile" && <Profile />}
      </div>
    </>
  )}
  <Toaster position="bottom-center" />
</section>
  );
};

export default Home;
