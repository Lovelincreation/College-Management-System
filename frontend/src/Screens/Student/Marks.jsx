import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const userData = useSelector((state) => state.userData);
  const [internal, setInternal] = useState();
  const [external, setExternal] = useState();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/getMarks`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.length !== 0) {
          setInternal(response.data.Mark[0].internal);
          setExternal(response.data.Mark[0].external);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
      });
  }, [userData.enrollmentNo]);

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-center px-4 md:px-10 mb-10">
      <Heading title={`Marks of Semester ${userData.semester}`} />
      
      {/* Marks Section */}
      <div className="mt-10 w-full flex flex-col md:flex-row md:gap-10 gap-5">
        {internal && (
          <div className="w-full md:w-1/2 shadow-md p-4 rounded-lg bg-white">
            <p className="border-b-2 border-red-500 text-lg md:text-2xl font-semibold pb-2">
              Internal Marks (Out of 25)
            </p>
            <div className="mt-5">
              {Object.keys(internal).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full text-base md:text-lg mt-2"
                >
                  <p className="w-1/2">{item}</p>
                  <span className="font-medium">{internal[item]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {external && (
          <div className="w-full md:w-1/2 shadow-md p-4 rounded-lg bg-white">
            <p className="border-b-2 border-red-500 text-lg md:text-2xl font-semibold pb-2">
              External Marks (Out of 75)
            </p>
            <div className="mt-5">
              {Object.keys(external).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full text-base md:text-lg mt-2"
                >
                  <p className="w-1/2">{item}</p>
                  <span className="font-medium">{external[item]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* No Marks Message */}
      {!internal && !external && (
        <p className="text-center text-gray-500 mt-6">No Marks Available At The Moment!</p>
      )}
    </div>
  );
};

export default Marks;
