import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const [subject, setSubject] = useState();
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    examType: "",
  });

  useEffect(() => {
    getBranchData();
    getSubjectData();
  }, []);

  const loadStudentDetails = () => {
    axios
      .post(`${baseApiURL()}/student/details/getDetails`, {
        branch: selected.branch,
        semester: selected.semester,
      })
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const submitMarksHandler = () => {
    document.querySelectorAll(".marks-input").forEach((input) => {
      setStudentMarksHandler(input.dataset.enrollment, input.value);
    });
  };

  const setStudentMarksHandler = (enrollment, value) => {
    axios
      .post(`${baseApiURL()}/marks/addMarks`, {
        enrollmentNo: enrollment,
        [selected.examType]: {
          [selected.subject]: value,
        },
      })
      .then((response) => {
        response.data.success ? toast.success(response.data.message) : toast.error(response.data.message);
      })
      .catch((error) => toast.error(error.message));
  };

  const getBranchData = () => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`)
      .then((response) => response.data.success && setBranch(response.data.branches))
      .catch((error) => toast.error(error.message));
  };

  const getSubjectData = () => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        response.data.success ? setSubject(response.data.subject) : toast.error(response.data.message);
      })
      .catch((error) => toast.dismiss() || toast.error(error.message));
  };

  const resetValueHandler = () => setStudentData();

  return (
    <div className="w-full flex flex-col items-center my-10 px-4">
      <div className="relative w-full flex justify-between items-center">
        <Heading title="Upload Marks" />
        {studentData && (
          <button className="absolute right-2 flex items-center border-2 border-red-500 px-3 py-2 rounded text-red-500" onClick={resetValueHandler}>
            <BiArrowBack className="mr-2 text-red-500" /> Close
          </button>
        )}
      </div>

      {!studentData && (
        <div className="mt-10 w-full flex flex-wrap gap-4">
          {["branch", "semester", "subject", "examType"].map((key, index) => (
            <div key={index} className="w-full sm:w-[48%] lg:w-[23%]">
              <label htmlFor={key} className="text-base block mb-1 capitalize">Select {key}</label>
              <select
                id={key}
                className="w-full p-3 bg-blue-50 rounded-sm"
                value={selected[key]}
                onChange={(e) => setSelected({ ...selected, [key]: e.target.value })}
              >
                <option defaultValue>-- Select --</option>
                {key === "branch" && branch?.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                {key === "semester" && Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}st Semester</option>
                ))}
                {key === "subject" && subject?.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                {key === "examType" && ["internal", "external"].map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
          ))}
          <button className="bg-blue-500 text-white px-6 py-2 rounded mt-6 mx-auto" onClick={loadStudentDetails}>Load Student Data</button>
        </div>
      )}

      {studentData && studentData.length > 0 && (
        <>
          <p className="mt-4 text-lg text-center">
            Upload {selected.examType} Marks of {selected.branch} Semester {selected.semester} for {selected.subject}
          </p>
          <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
            {studentData.map((student) => (
              <div key={student.enrollmentNo} className="w-full sm:w-[48%] md:w-[30%] flex items-center border-2 border-blue-500 rounded">
                <p className="text-lg p-3 bg-blue-50 w-1/2">{student.enrollmentNo}</p>
                <input
                  type="number"
                  className="marks-input w-1/2 p-3 focus:outline-none"
                  placeholder="Enter Marks"
                  data-enrollment={student.enrollmentNo}
                />
              </div>
            ))}
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded mt-6" onClick={submitMarksHandler}>Upload Student Marks</button>
        </>
      )}
    </div>
  );
};

export default Marks;