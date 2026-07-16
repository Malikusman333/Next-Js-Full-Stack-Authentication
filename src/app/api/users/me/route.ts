import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import { getdetailsUser } from "@/src/helpers/getdetailsUser";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getdetailsUser(request);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error:any) {
  return  NextResponse.json({error:error.message},{status:400})
  }
}
