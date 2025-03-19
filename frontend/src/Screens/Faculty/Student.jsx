import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";

const Student = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState("");

  const searchStudentHandler = (e) => {
    e.preventDefault();
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      semester: "",
      branch: "",
      gender: "",
      profile: "",
    });

    toast.loading("Getting Student");
    axios
      .post(`${baseApiURL()}/student/details/getDetails`, { enrollmentNo: search }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success && response.data.user.length > 0) {
          toast.success(response.data.message);
          setData(response.data.user[0]);
          setId(response.data.user[0]._id);
        } else {
          toast.error("No Student Found!");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Something went wrong!");
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-center mb-10 px-4">
      <div className="w-full">
        <Heading title="Student Details" />
      </div>

      {/* Search Form */}
      <div className="my-6 w-full flex justify-center">
        <form
          className="flex items-center border-2 border-blue-500 rounded-lg w-full sm:w-[60%] md:w-[40%]"
          onSubmit={searchStudentHandler}
        >
          <input
            type="text"
            className="px-4 py-3 w-full outline-none text-lg"
            placeholder="Enrollment No."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 text-2xl hover:text-blue-500" type="submit">
            <FiSearch />
          </button>
        </form>
      </div>

      {/* Student Details Card */}
      {id && (
        <div className="w-full max-w-3xl bg-blue-50 mt-10 flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-md shadow-md">
          {/* Student Info */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-2xl font-semibold">
              {data.firstName} {data.middleName} {data.lastName}
            </p>
            <div className="mt-3 text-lg">
              <p className="mb-2">Register No: {data.enrollmentNo}</p>
              <p className="mb-2">Phone Number: +91 {data.phoneNumber}</p>
              <p className="mb-2">Email Address: {data.email}</p>
              <p className="mb-2">Branch: {data.branch}</p>
              <p className="mb-2">Semester: {data.semester}</p>
            </div>
          </div>

          {/* Student Image */}
          <div className="mt-6 sm:mt-0 sm:ml-6 flex justify-center">
            <img
              src={`${process.env.REACT_APP_MEDIA_LINK}/${data.profile}`}
              alt="student profile"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
