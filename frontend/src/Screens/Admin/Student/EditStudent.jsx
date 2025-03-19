import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiSearch, FiUpload, FiX } from "react-icons/fi";
const EditStudent = () => {
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();
  const [search, setSearch] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
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
  const [id, setId] = useState();
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

  const updateStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Student");
    const formData = new FormData();
    formData.append("enrollmentNo", data.enrollmentNo);
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("semester", data.semester);
    formData.append("branch", data.branch);
    formData.append("gender", data.gender);
    if (file) {
      formData.append("type", "profile");
      formData.append("profile", file);
    }
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .put(`${baseApiURL()}/student/details/updateDetails/${id}`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          clearSearchHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const searchStudentHandler = (e) => {
    setSearchActive(true);
    e.preventDefault();
    toast.loading("Getting Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Student Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              semester: response.data.user[0].semester,
              branch: response.data.user[0].branch,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
            setId(response.data.user[0]._id);
          }
        } else {
          if (response?.data) toast.error(response.data.message);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        if (error?.response?.data) toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const clearSearchHandler = () => {
    setSearchActive(false);
    setSearch("");
    setId("");
    setPreviewImage("");
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
    });
  };

  return (
    <div className="my-6 mx-auto w-full px-6">
    {/* Search Bar */}
    <form
      className="flex justify-center items-center border-2 border-blue-500 rounded w-full md:w-[40%] mx-auto "
      onSubmit={searchStudentHandler}
    >
      <input
        type="text"
        className="px-4 py-2 md:px-6 md:py-3 w-full outline-none"
        placeholder="Register No."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {!searchActive && (
        <button className="px-4 text-2xl hover:text-blue-500" type="submit">
          <FiSearch />
        </button>
      )}
      {searchActive && (
        <button
          className="px-4 text-2xl hover:text-blue-500"
          onClick={clearSearchHandler}
        >
          <FiX />
        </button>
      )}
    </form>
  
    {/* Update Student Form */}
    {search && id && (
      <form
        onSubmit={updateStudentProfile}
        className="w-full md:w-[70%] flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 mx-auto mt-6"
      >
        {/* Input Fields */}
        {[
          { id: "firstname", label: "Enter First Name", type: "text", value: data.firstName, onChange: (e) => setData({ ...data, firstName: e.target.value }) },
          { id: "middlename", label: "Enter Middle Name", type: "text", value: data.middleName, onChange: (e) => setData({ ...data, middleName: e.target.value }) },
          { id: "lastname", label: "Enter Last Name", type: "text", value: data.lastName, onChange: (e) => setData({ ...data, lastName: e.target.value }) },
          { id: "enrollmentNo", label: "Register No", type: "number", value: data.enrollmentNo, onChange: (e) => setData({ ...data, enrollmentNo: e.target.value }), disabled: true },
          { id: "email", label: "Enter Email Address", type: "email", value: data.email, onChange: (e) => setData({ ...data, email: e.target.value }) },
          { id: "phoneNumber", label: "Enter Phone Number", type: "number", value: data.phoneNumber, onChange: (e) => setData({ ...data, phoneNumber: e.target.value }) },
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
              disabled={field.disabled || false}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        ))}
  
        {/* Semester Dropdown */}
        <div className="w-full md:w-[40%]">
          <label htmlFor="semester" className="leading-7 text-sm">
            Semester
          </label>
          <select
            disabled
            id="semester"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
            value={data.semester}
            onChange={(e) => setData({ ...data, semester: e.target.value })}
          >
            <option defaultValue>-- Select --</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}st Semester
              </option>
            ))}
          </select>
        </div>
  
        {/* Branch Dropdown */}
        <div className="w-full md:w-[40%]">
          <label htmlFor="branch" className="leading-7 text-sm">
            Branch
          </label>
          <select
            disabled
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
  
        {/* File Upload */}
        <div className="w-full md:w-[40%]">
          <label htmlFor="file" className="leading-7 text-sm">
            Select New Profile
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
        {!previewImage && data.profile && (
          <div className="w-full flex justify-center items-center">
            <img
              src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
              alt="student"
              className="h-36"
            />
          </div>
        )}
  
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
        >
          Update Student
        </button>
      </form>
    )}
  </div>
  );
};

export default EditStudent;
