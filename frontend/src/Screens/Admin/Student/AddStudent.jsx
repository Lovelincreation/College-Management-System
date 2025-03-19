import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddStudent = () => {
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth:"",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    class:"",
    collegeId:"",
    gender: "",
  });
  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBranchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("enrollmentNo", data.enrollmentNo);
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("semester", data.semester);
    formData.append("branch", data.branch);
    formData.append("class", data.class);
    formData.append("collegeId", data.collegeId);
    formData.append("gender", data.gender);
    formData.append("type", "profile");
    formData.append("profile", file);
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(`${baseApiURL()}/student/auth/register`, {
              loginid: data.enrollmentNo,
              password: data.enrollmentNo,
            })
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  enrollmentNo: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  dateOfBirth: "",
                  email: "",
                  phoneNumber: "",
                  semester: "",
                  branch: "",
                  class: "",
                  collegeId: "",
                  gender: "",
                  profile: "",
                });
                setPreviewImage();
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
    onSubmit={addStudentProfile}
    className="w-full md:w-[70%] flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 mx-auto mt-10 px-6"
  >
    {/* Input Fields */}
    {[
      { id: "firstname", label: "Enter First Name", type: "text", value: data.firstName, onChange: (e) => setData({ ...data, firstName: e.target.value }) },
      { id: "lastname", label: "Enter Last Name", type: "text", value: data.lastName, onChange: (e) => setData({ ...data, lastName: e.target.value }) },
      { id: "enrollmentNo", label: "Enter Register No", type: "number", value: data.enrollmentNo, onChange: (e) => setData({ ...data, enrollmentNo: e.target.value }) },
      { id: "dateOfBirth", label: "Enter Date of Birth", type: "date", value: data.dateOfBirth, onChange: (e) => setData({ ...data, dateOfBirth: e.target.value }) },
      { id: "email", label: "Enter Email Address", type: "email", value: data.email, onChange: (e) => setData({ ...data, email: e.target.value }) },
      { id: "phoneNumber", label: "Enter Phone Number", type: "number", value: data.phoneNumber, onChange: (e) => setData({ ...data, phoneNumber: e.target.value }) },
      { id: "class", label: "Enter Class", type: "text", value: data.class, onChange: (e) => setData({ ...data, class: e.target.value }) },
      { id: "collegeId", label: "Enter College Id", type: "text", value: data.collegeId, onChange: (e) => setData({ ...data, collegeId: e.target.value }) },
    ].map((field) => (
      <div key={field.id} className="w-full md:w-[40%]">
        <label htmlFor={field.id} className="leading-7 text-sm">
          {field.label}
        </label>
        <input
          type={field.type}
          id={field.id}
          value={field.value}
          onChange={field.onChange}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    ))}
  
    {/* Semester Dropdown */}
    <div className="w-full md:w-[40%]">
      <label htmlFor="semester" className="leading-7 text-sm">
        Select Semester
      </label>
      <select
        id="semester"
        className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
        value={data.semester}
        onChange={(e) => setData({ ...data, semester: e.target.value })}
      >
        <option defaultValue>-- Select --</option>
        {[1, 2, 3, 4, 5, 6].map((sem) => (
          <option key={sem} value={sem}>
            {sem}st Semester
          </option>
        ))}
      </select>
    </div>
  
    {/* Branch Dropdown */}
    <div className="w-full md:w-[40%]">
      <label htmlFor="branch" className="leading-7 text-sm">
        Select Branch
      </label>
      <select
        id="branch"
        className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
        value={data.branch}
        onChange={(e) => setData({ ...data, branch: e.target.value })}
      >
        <option defaultValue>-- Select --</option>
        {branch?.map((branch) => (
          <option key={branch.name} value={branch.name}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  
    {/* Gender Dropdown */}
    <div className="w-full md:w-[40%]">
      <label htmlFor="gender" className="leading-7 text-sm">
        Select Gender
      </label>
      <select
        id="gender"
        className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
        value={data.gender}
        onChange={(e) => setData({ ...data, gender: e.target.value })}
      >
        <option defaultValue>-- Select --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  
    {/* File Upload */}
    <div className="w-full md:w-[40%]">
      <label htmlFor="file" className="leading-7 text-sm">
        Select Profile
      </label>
      <label
        htmlFor="file"
        className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
      >
        Upload
        <span className="ml-2">
          <FiUpload />
        </span>
      </label>
      <input
        hidden
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  
    {/* Preview Image */}
    {previewImage && (
      <div className="w-full flex justify-center items-center">
        <img src={previewImage} alt="student" className="h-36" />
      </div>
    )}
  
    {/* Submit Button */}
    <button
      type="submit"
      className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
    >
      Add New Student
    </button>
  </form>
  );
};

export default AddStudent;
