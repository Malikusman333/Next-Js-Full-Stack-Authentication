"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  async function logout() {
    try {
      await axios.get("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error.message);
    }
  }

const [data , setData] = useState("nothing")
async function getUserDetail() {
  try {
    const res = await axios.get("/api/users/me");
    console.log(res.data)
    setData(res.data.data.username);

  } catch (error: any) {
    console.log("Data Not Found", error.message);
  }
}
  // useEffect(() => {
  //   getUserDetail();
  // }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </p>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        LOGOUT
      </button>
      <button
        onClick={getUserDetail}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}
