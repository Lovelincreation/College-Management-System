import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Timetable = () => {
  const [addselected, setAddSelected] = useState({
    branch: "",
    semester: "",
  });
  const [file, setFile] = useState(null);
  const [branch, setBranch] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    getBranchData();
  }, []);

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
      console.error(error);
      toast.error("Failed to load branches");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const addTimetableHandler = async () => {
    if (!file || !addselected.branch || !addselected.semester) {
      toast.error("Please select all fields and upload a file.");
      return;
    }

    toast.loading("Adding Timetable...");
    const formData = new FormData();
    formData.append("branch", addselected.branch);
    formData.append("semester", addselected.semester);
    formData.append("type", "timetable");
    formData.append("timetable", file);

    try {
      const response = await axios.post(
        `${baseApiURL()}/timetable/addTimetable`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success("Timetable uploaded successfully!");
        setAddSelected({ branch: "", semester: "" });
        setFile(null);
        setPreviewUrl("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Failed to upload timetable.");
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-center mb-10 px-4">
      <div className="w-full">
        <Heading title="Upload Timetable" />
      </div>

      <div className="w-full flex flex-col items-center mt-8">
        <p className="mb-4 text-xl font-medium">Add Timetable</p>

        {/* Select Branch */}
        <select
          className="px-3 py-3 bg-blue-50 rounded-md text-base w-[90%] sm:w-[80%] md:w-[70%] border focus:ring-2 focus:ring-blue-500 mt-4"
          value={addselected.branch}
          onChange={(e) =>
            setAddSelected({ ...addselected, branch: e.target.value })
          }
        >
          <option value="">-- Select Branch --</option>
          {branch.map((item) => (
            <option value={item.name} key={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Select Semester */}
        <select
          className="px-3 py-3 bg-blue-50 rounded-md text-base w-[90%] sm:w-[80%] md:w-[70%] border focus:ring-2 focus:ring-blue-500 mt-4"
          value={addselected.semester}
          onChange={(e) =>
            setAddSelected({ ...addselected, semester: e.target.value })
          }
        >
          <option value="">-- Select Semester --</option>
          {[...Array(8)].map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}th Semester
            </option>
          ))}
        </select>

        {/* Upload File */}
        {!previewUrl && (
          <label
            htmlFor="upload"
            className="flex justify-center items-center bg-blue-50 text-base px-3 py-3 rounded-md w-[90%] sm:w-[80%] md:w-[70%] mt-4 cursor-pointer border hover:bg-blue-100 transition"
          >
            Select Timetable
            <FiUpload className="ml-2" />
          </label>
        )}

        {/* Remove File */}
        {previewUrl && (
          <p
            className="flex justify-center items-center text-base px-3 py-3 border border-red-500 text-red-500 rounded-md w-[90%] sm:w-[80%] md:w-[70%] mt-4 cursor-pointer hover:bg-red-50 transition"
            onClick={() => {
              setFile(null);
              setPreviewUrl("");
            }}
          >
            Remove Selected Timetable
            <AiOutlineClose className="ml-2" />
          </p>
        )}

        <input
          type="file"
          id="upload"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white text-base px-5 py-3 rounded-md w-[90%] sm:w-[80%] md:w-[70%] mt-6 hover:bg-blue-600 transition"
          onClick={addTimetableHandler}
        >
          Add Timetable
        </button>

        {/* Image Preview */}
        {previewUrl && (
          <img
            className="mt-6 max-w-full sm:max-w-[70%] md:max-w-[50%] rounded-lg shadow-md"
            src={previewUrl}
            alt="timetable preview"
          />
        )}
      </div>
    </div>
  );
};

export default Timetable;
