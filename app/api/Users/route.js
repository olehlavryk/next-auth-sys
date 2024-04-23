import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    // Confirm that data exists
    if (!userData?.email || !userData?.password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred", error }, { status: 500 })
  }
}
