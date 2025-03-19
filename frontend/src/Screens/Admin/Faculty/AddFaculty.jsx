import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddFaculty = () => {
  const [file, setFile] = useState(null);
  const [branch, setBranch] = useState([]); // Ensure branch is an array
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateofbirth: "",
    email: "",
    phoneNumber: "",
    department: "",
    respectiveclass: "",
    gender: "",
    experience: "",
    post: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const getBranchData = async () => {
      try {
        const response = await axios.get(`${baseApiURL()}/branch/getBranch`, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("Failed to load branches.");
      }
    };

    getBranchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const addFacultyProfile = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a profile image.");
      return;
    }

    toast.loading("Adding Faculty...");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formData.append("type", "profile");
    formData.append("profile", file);

    try {
      const response = await axios.post(`${baseApiURL()}/faculty/details/addDetails`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);

        // Register faculty in authentication system
        const authResponse = await axios.post(`${baseApiURL()}/faculty/auth/register`, {
          loginid: data.employeeId,
          password: data.employeeId,
        });

        if (authResponse.data.success) {
          toast.success(authResponse.data.message);
          setFile(null);
          setPreviewImage("");
          setData({
            employeeId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            dateofbirth: "",
            email: "",
            phoneNumber: "",
            department: "",
            respectiveclass: "",
            gender: "",
            experience: "",
            post: "",
          });
        } else {
          toast.error(authResponse.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={addFacultyProfile} className="w-full max-w-4xl mx-auto mt-10 p-4 flex flex-wrap gap-4">
      {Object.keys(data).map((key) => (
        <div key={key} className="w-full md:w-[48%]">
          <label htmlFor={key} className="text-sm font-medium">
            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
          </label>
          <input
            type={key === "dateofbirth" ? "date" : "text"}
            id={key}
            value={data[key]}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
            className="w-full bg-blue-50 rounded border p-2 mt-1 focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none transition-colors duration-200 ease-in-out"
          />
        </div>
      ))}

      {/* Branch Dropdown */}
      <div className="w-full md:w-[48%]">
        <label htmlFor="branch" className="text-sm font-medium">Branch</label>
        <select
          id="branch"
          value={data.branch || ""}
          onChange={(e) => setData({ ...data, branch: e.target.value })}
          className="w-full bg-blue-50 rounded border p-2 mt-1"
        >
          <option value="">Select Branch</option>
          {branch.map((b) => (
            <option key={b._id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div className="w-full md:w-[48%]">
        <label htmlFor="profile" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
          Upload Profile <FiUpload />
        </label>
        <input hidden type="file" id="profile" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* Preview Image */}
      {previewImage && (
        <div className="w-full flex justify-center items-center">
          <img src={previewImage} alt="Preview" className="h-36 rounded-md" />
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 px-6 py-3 rounded-md text-white mt-4 hover:bg-blue-600 transition">
        Add New Faculty
      </button>
    </form>
  );
};

export default AddFaculty;
