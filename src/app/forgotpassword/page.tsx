"use client";
import axios from "axios";
import React, { useEffect } from "react";


export default function forgotpassword() {

const [user, setUser] = React.useState({
  email: "",
});
const [loading, setLoading] = React.useState(false);
const [disableBtn, setDisableBtn] = React.useState(false);

useEffect(() => {
  if (user.email.length > 0) {
    setDisableBtn(false);
  } else {
    setDisableBtn(true);
  }
}, [user]);

const sendresetlink = async () => {
  try {
    setLoading(true);
    const response = await axios.post("/api/users/forgotpassword", {
      email: user.email,
    });
    console.log(
      "Reset password link has been sent to your email.",
      response.data,
    );

  } catch (error: any) {
    setLoading(false);
    console.error("Email sent failed", error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-500 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {loading ? "Processing" : "Forgot Password"}
        </h2>
        <div className="space-y-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={sendresetlink}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {disableBtn ? " No Send Reset Link" : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}


