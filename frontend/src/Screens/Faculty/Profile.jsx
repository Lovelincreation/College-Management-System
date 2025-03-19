import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({ new: "", current: "" });

  useEffect(() => {
    axios
      .post(`${baseApiURL()}/${router.state.type}/details/getDetails`, 
        { employeeId: router.state.loginid }, 
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              employeeId: response.data.user[0].employeeId,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  }, [router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${baseApiURL()}/faculty/auth/login`, 
        { loginid: router.state.loginid, password: password.current }, 
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        response.data.success ? changePasswordHandler(response.data.id) : toast.error(response.data.message);
      })
      .catch((error) => toast.error(error.response?.data?.message));
  };

  const changePasswordHandler = (id) => {
    axios
      .put(`${baseApiURL()}/faculty/auth/update/${id}`, 
        { loginid: router.state.loginid, password: password.new }, 
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        response.data.success 
          ? toast.success(response.data.message) || setPassword({ new: "", current: "" }) 
          : toast.error(response.data.message);
      })
      .catch((error) => toast.error(error.response?.data?.message));
  };

  return (
    <div className="w-full max-w-5xl mx-lg-5 p-4 flex flex-col md:flex-row items-center md:items-start gap-6">
      {data && (
        <>
          <div className="w-full md:w-2/3 space-y-4">
            <p className="text-2xl font-semibold">
              Hello {data[0].firstName} {data[0].middleName} {data[0].lastName} 👋
            </p>
            <div className="space-y-2">
              <p className="text-lg font-normal">Employee Id: {data[0].employeeId}</p>
              <p className="text-lg font-normal">Post: {data[0].post}</p>
              <p className="text-lg font-normal">Email: {data[0].email}</p>
              <p className="text-lg font-normal">Phone: {data[0].phoneNumber}</p>
              <p className="text-lg font-normal">Department: {data[0].department}</p>
            </div>

            <button
              className={`px-4 py-2 rounded mt-4 transition-all ${
                showPass ? "bg-red-500 text-white" : "bg-blue-600 text-white"
              }`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>

            {showPass && (
              <form className="mt-4 border-t-2 border-blue-500 pt-4 space-y-3" onSubmit={checkPasswordHandler}>
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  placeholder="Current Password"
                  className="w-full px-3 py-2 border-2 border-blue-500 rounded outline-none"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  placeholder="New Password"
                  className="w-full px-3 py-2 border-2 border-blue-500 rounded outline-none"
                />
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700 transition"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>

          <img
            src={process.env.REACT_APP_MEDIA_LINK + "/" + data[0].profile}
            alt="faculty profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
          />

        </>
      )}
    </div>
  );
};

export default Profile;
