import { connect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModels";

import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {token, newpassword , confirmpassword } = reqBody;
 const user = await User.findOne({
     forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: " invalid Token" }, { status: 400 });
    }
  if (newpassword !== confirmpassword) {
 return NextResponse.json(
   { message: "Passwords do not match" },
   { status: 400 },
 );
  }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newpassword, salt)

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry =undefined ;
  await  user.save();

    return NextResponse.json({
      message: " Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
