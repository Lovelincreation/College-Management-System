import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";

const Subjects = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
  });
  const [selected, setSelected] = useState("add");
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    getSubjectHandler();
  }, []);

  const getSubjectHandler = () => {
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const addSubjectHandler = () => {
    toast.loading("Adding Subject");
    axios
      .post(`${baseApiURL()}/subject/addSubject`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "" });
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "An error occurred");
      });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Subject");
    axios
      .delete(`${baseApiURL()}/subject/deleteSubject/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-center flex-col mb-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <Heading title="Manage Subjects" />
        <div className="flex flex-wrap justify-center sm:justify-end items-center w-full gap-2 mt-4 sm:mt-0">
          <button
            className={`${
              selected === "add" ? "border-b-2 border-blue-500" : ""
            } px-4 py-2 text-black rounded-md shadow-md transition-all`}
            onClick={() => setSelected("add")}
          >
            Add Subject
          </button>
          <button
            className={`${
              selected === "view" ? "border-b-2 border-blue-500" : ""
            } px-4 py-2 text-black rounded-md shadow-md transition-all`}
            onClick={() => setSelected("view")}
          >
            View Subjects
          </button>
        </div>
      </div>

      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="w-full sm:w-[90%] md:w-[40%] mb-4">
            <label htmlFor="code" className="leading-7 text-sm">
              Enter Subject Code
            </label>
            <input
              type="text"
              id="code"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              className="w-full bg-blue-50 rounded-md border focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-base outline-none py-2 px-4 transition-all"
            />
          </div>
          <div className="w-full sm:w-[90%] md:w-[40%]">
            <label htmlFor="name" className="leading-7 text-sm">
              Enter Subject Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-blue-50 rounded-md border focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-base outline-none py-2 px-4 transition-all"
            />
          </div>
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-600 px-8 py-3 text-white rounded-md shadow-md transition-all"
            onClick={addSubjectHandler}
          >
            Add Subject
          </button>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-8 w-full max-w-full overflow-x-auto">
          <ul className="w-full sm:w-[90%] md:w-[70%] mx-auto">
            {subject.length > 0 ? (
              subject.map((item) => (
                <li
                  key={item.code}
                  className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center rounded-md shadow-md"
                >
                  <div>
                    {item.code} - {item.name}
                  </div>
                  <button
                    className="text-2xl hover:text-red-500 transition-all"
                    onClick={() => deleteSubjectHandler(item._id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No subjects found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subjects;
