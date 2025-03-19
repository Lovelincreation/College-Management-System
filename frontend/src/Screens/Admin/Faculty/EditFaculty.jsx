import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiSearch, FiUpload, FiX } from "react-icons/fi";

const EditFaculty = () => {
  const [file, setFile] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    gender: "",
    experience: "",
    post: "",
    profile: "",
  });
  const [id, setId] = useState();
  const [search, setSearch] = useState();
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const updateFacultyProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Faculty");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (file) {
      formData.append("type", "profile");
      formData.append("profile", file);
    }
    axios
      .put(`${baseApiURL()}/faculty/details/updateDetails/${id}`, formData, { headers })
      .then((response) => {
        toast.dismiss();
        response.data.success ? toast.success(response.data.message) : toast.error(response.data.message);
        clearSearchHandler();
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Error updating faculty");
      });
  };

  const searchFacultyHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Faculty");
    axios
      .post(`${baseApiURL()}/faculty/details/getDetails`, { employeeId: search })
      .then((response) => {
        toast.dismiss();
        if (response.data.user.length === 0) {
          toast.error("No Faculty Found!");
        } else {
          toast.success(response.data.message);
          setId(response.data.user[0]._id);
          setData(response.data.user[0]);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Error fetching faculty");
      });
  };

  const clearSearchHandler = () => {
    setSearchActive(false);
    setSearch("");
    setId("");
    setPreviewImage("");
    setData({
      employeeId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      department: "",
      gender: "",
      experience: "",
      post: "",
      profile: "",
    });
  };

  return (
    <div className="my-6 mx-auto w-full max-w-3xl px-4">
      <form
        className="flex justify-center items-center border-2 border-blue-500 rounded w-full sm:w-3/4 mx-auto"
        onSubmit={searchFacultyHandler}
      >
        <input
          type="text"
          className="px-4 py-2 w-full outline-none"
          placeholder="Faculty ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 text-xl hover:text-blue-500"
          type={!searchActive ? "submit" : "button"}
          onClick={searchActive ? clearSearchHandler : undefined}
        >
          {searchActive ? <FiX /> : <FiSearch />}
        </button>
      </form>
      {search && id && (
        <form
          onSubmit={updateFacultyProfile}
          className="w-full flex flex-col gap-4 mx-auto mt-6"
        >
          {Object.entries(data).map(([key, value]) => (
            key !== "profile" && key !== "employeeId" && (
              <div key={key} className="w-full">
                <label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type={key === "email" ? "email" : key === "phoneNumber" || key === "experience" ? "number" : "text"}
                  value={value}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                  className="w-full bg-blue-50 rounded border p-2 outline-none"
                />
              </div>
            )
          ))}
          <div className="w-full">
            <label className="text-sm">Upload New Profile</label>
            <label
              htmlFor="file"
              className="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Upload <FiUpload className="ml-2" />
            </label>
            <input hidden type="file" id="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="h-32 mx-auto" />
          )}
          {!previewImage && data.profile && (
            <img src={`${process.env.REACT_APP_MEDIA_LINK}/${data.profile}`} alt="Faculty" className="h-32 mx-auto" />
          )}
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">Update Faculty</button>
        </form>
      )}
    </div>
  );
};

export default EditFaculty;