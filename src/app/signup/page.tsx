"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const [disableBtn, setDisableBtn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const Signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
   console.log("Signup success", response.data);


 router.push("/login");


      console.log(response);
    } catch (error:any) {
      setLoading(false);
            console.log("Signup failed", error.message);
    }finally{
            setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-500 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {loading ? "Processing " : "SignUp"}
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
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/*Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* SignUp Button */}
          <button
            type="button"
            onClick={Signup}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {disableBtn ? "NoSigUp " : "SignUp"}
          </button>
          <Link href="/login" className="ml-32">
            Visit login page
          </Link>
        </form>
      </div>
    </div>
  );
}
