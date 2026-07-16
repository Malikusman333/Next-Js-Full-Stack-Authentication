import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 },
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    //token data

    const tokenData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    //create token

    const Token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"});

const response =  NextResponse.json({
      message: "User Login successfully",
      success: true,
    });

  response.cookies.set("token",Token,{
httpOnly:true
  })
return response;
 
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
