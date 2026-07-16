"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";






export default function resetPassword (){
    const router = useRouter();
    const [user,  setUser] = useState({
        newpassword: "",
        confirmpassword: ""
    })
    const [disableBtn , setDisableBtn] = useState(false)
    const [loading , setLoading] = useState(false)
    const [token, setToken] = useState("");
    useEffect(() => {
      const tokenUrl = window.location.search.split("=")[1];
      setToken(tokenUrl || "");
    }, []);

    const reset = async () => {
        if (user.newpassword !== user.confirmpassword) {
          alert("Passwords do not match");
          return;
        }

      try {
            setLoading(true);
        await axios.post("/api/users/resetpassword", {
          token,
          newpassword: user.newpassword,
          confirmpassword: user.confirmpassword,
        });
router.push("/login");
      } catch (error: any) {
           setLoading(false);
        console.log(error?.response.data);
      }finally{
            setLoading(false);
      }
    };




useEffect(() => {
  if (user.newpassword.length > 0 && user.confirmpassword.length > 0) {
    setDisableBtn(false);
  } else {
    setDisableBtn(true);
  }
}, [user]);

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-800">
    <div className="w-full max-w-md bg-gray-500 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        {loading ? "Processing " : "Reset Password"}
      </h2>

      <form className="space-y-5">
        {/* New Password */}
        <div>
          <label
            htmlFor="newpassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="newpassword"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.newpassword}
            onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
          />
        </div>
        {/*Confirm  Password */}
        <div>
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
           Confirm Password
          </label>
          <input
            id="confirmpassword"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.confirmpassword}
            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
          />
        </div>

        <button
          type="button"
          onClick={reset}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          {disableBtn ? "No Reset " : "Reset Password"}
        </button>
      </form>
    </div>
  </div>
);
}