/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";

const Material = () => {
  const { fullname } = useSelector((state) => state.userData);
  const [subject, setSubject] = useState([]);
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState({
    title: "",
    subject: "",
    faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
  });

  useEffect(() => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, []);

  const addMaterialHandler = () => {
    if (!selected.title || !selected.subject || !file) {
      toast.error("Please fill all fields and upload a file.");
      return;
    }

    toast.loading("Adding Material");
    const formData = new FormData();
    formData.append("title", selected.title);
    formData.append("subject", selected.subject);
    formData.append("faculty", selected.faculty);
    formData.append("type", "material");
    formData.append("material", file);

    axios
      .post(`${baseApiURL()}/material/addMaterial`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success("Material uploaded successfully!");
          setSelected({
            title: "",
            subject: "",
            faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
          });
          setFile(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Upload failed");
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-center mb-10 px-4">
      <Heading title="Upload Material" />
      <div className="w-full flex flex-col items-center mt-8">
        {/* Title Input */}
        <div className="w-full max-w-md">
          <label htmlFor="title" className="block text-lg font-medium">Material Title</label>
          <input
            type="text"
            id="title"
            className="bg-blue-50 py-2 px-4 w-full rounded-md border mt-1"
            value={selected.title}
            onChange={(e) => setSelected({ ...selected, title: e.target.value })}
          />
        </div>
        
        {/* Subject Dropdown */}
        <div className="w-full max-w-md mt-4">
          <label htmlFor="subject" className="block text-lg font-medium">Material Subject</label>
          <select
            id="subject"
            value={selected.subject}
            onChange={(e) => setSelected({ ...selected, subject: e.target.value })}
            className="px-4 py-3 bg-blue-50 w-full rounded-md border mt-1"
          >
            <option value="">-- Select Subject --</option>
            {subject.map((item) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        {!file ? (
          <label
            htmlFor="upload"
            className="flex justify-center items-center bg-blue-50 py-3 px-4 w-full max-w-md rounded-md border mt-4 cursor-pointer hover:bg-blue-100 transition"
          >
            Upload Material <FiUpload className="ml-2" />
          </label>
        ) : (
          <p
            className="flex justify-center items-center py-3 px-4 border border-red-500 text-red-500 rounded-md w-full max-w-md mt-4 cursor-pointer hover:bg-red-50 transition"
            onClick={() => setFile(null)}
          >
            Remove Selected Material <AiOutlineClose className="ml-2" />
          </p>
        )}
        
        <input
          type="file"
          id="upload"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white text-lg px-5 py-3 rounded-md w-full max-w-md mt-6 hover:bg-blue-600 transition"
          onClick={addMaterialHandler}
        >
          Add Material
        </button>
      </div>
    </div>
  );
};

export default Material;
