import { connect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModels";
import { sendEmail } from "@/src/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({email });
    if (!user) {
      return NextResponse.json({ error: " invalid Token" }, { status: 400 });
    }
  await sendEmail({ email, emailType: "RESET", userId: user._id});


    return NextResponse.json({
      message: " Reset password link sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
