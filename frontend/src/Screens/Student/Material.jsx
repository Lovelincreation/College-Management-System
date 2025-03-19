import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Material = () => {
  const [subject, setSubject] = useState();
  const [selected, setSelected] = useState();
  const [material, setMaterial] = useState([]);

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

  const getSubjectMaterial = () => {
    axios
      .post(`${baseApiURL()}/material/getMaterial`, { subject: selected })
      .then((response) => {
        if (response.data.success) {
          setMaterial(response.data.material);
        } else {
          toast.error("Error fetching material.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSelectChangeHandler = (e) => {
    setMaterial([]);
    setSelected(e.target.value);
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-center px-4 md:px-10 mb-10">
      <Heading title="Material" />

      {/* Subject Selection */}
      <div className="mt-8 w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center w-full md:w-[40%] gap-3">
          <select
            value={selected}
            onChange={onSelectChangeHandler}
            className="w-full md:w-auto px-3 py-3 rounded-md text-sm md:text-base bg-blue-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option defaultValue value="select">
              -- Select Subject --
            </option>
            {subject &&
              subject.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
          <button
            onClick={getSubjectMaterial}
            className="bg-blue-500 text-white py-3 px-4 text-xl rounded-md hover:bg-blue-600 transition"
          >
            <HiOutlineSearch />
          </button>
        </div>

        {/* Study Materials */}
        <div className="mt-8 w-full">
          {material.length > 0 ? (
            material.reverse().map((item, index) => (
              <div
                key={index}
                className="border-blue-500 border-2 w-full rounded-lg shadow-sm py-4 px-6 mb-4 bg-white"
              >
                <p
                  className={`text-lg md:text-xl font-medium flex items-center ${
                    item.link && "cursor-pointer"
                  } group`}
                  onClick={() =>
                    item.link &&
                    window.open(process.env.REACT_APP_MEDIA_LINK + "/" + item.link)
                  }
                >
                  {item.title}{" "}
                  {item.link && (
                    <span className="text-xl md:text-2xl group-hover:text-blue-500 ml-1">
                      <IoMdLink />
                    </span>
                  )}
                </p>
                <p className="text-sm md:text-base font-normal mt-1">
                  {item.subject} - {item.faculty}
                </p>
                <p className="text-xs md:text-sm mt-2 flex items-center">
                  <HiOutlineCalendar className="mr-1 text-base" />
                  {item.createdAt.split("T")[0].split("-").reverse().join("/")}{" "}
                  {item.createdAt.split("T")[1].split(".")[0]}
                </p>
              </div>
            ))
          ) : (
            selected && <p className="text-center text-gray-500">No Material For {selected}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Material;
