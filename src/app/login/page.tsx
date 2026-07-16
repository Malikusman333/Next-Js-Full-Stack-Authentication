"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function loginPage(){
const router = useRouter();
const [user, setUser] = React.useState({
  email: "",
  password: "",
});
const [loading, setLoading] = React.useState(false)
const [disableBtn, setDisableBtn] = React.useState(false);


useEffect(()=>{
if (user.email.length>0 && user.password.length > 0) {
  setDisableBtn(false)
}else{
  setDisableBtn(true)
}
},[user])

const login =async () => {
try {
  setLoading(true);
  const response = await axios.post("/api/users/login", user);
  console.log("Login Success",response.data);
  router.push("/profile");
} catch (error: any) {
  setLoading(false);
  console.error("Login Failed", error.message);
} finally {
  setLoading(false);
}
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-500 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {loading ? "Processing" : "Login"}
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              value={user.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {disableBtn ? " No Login" : "Login"}
          </button>

          <Link href="/signup" className="ml-32">
            Visit signup page
          </Link>
          <br />
          <Link href="/forgotpassword">
          forgot password
          </Link>
        </form>
      </div>
    </div>
  );
}








