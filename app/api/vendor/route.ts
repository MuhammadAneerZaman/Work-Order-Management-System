import { Config } from "@/app/config/config";
import { getVendorByEmail } from "@/lib/vendor/getVendorByEmail";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const getVendorResponse = await getVendorByEmail(email);

    console.log("Get Vendor :: ", getVendorResponse);

    let code = getVendorResponse.code;

    if (code == 9280) {
      return NextResponse.json(
        { success: false, message: "Invalid Credentials" },
        { status: 400 },
      );
    }

    if (code == 3000) {
      const getVendor = getVendorResponse.data[0];
      const passwordH = getVendor.Password;

      const isValid = await argon2.verify(passwordH, password);

      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "Invalid Credentials" },
          { status: 400 },
        );
      }

      const secret = new TextEncoder().encode(Config.jwtSecret);

      const jwt = await new SignJWT({
        vendorId: getVendor.ID,
        type: "Vendor",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(secret);

      const response = NextResponse.json({
        success: true,
        message: "Login Successful",
      });

      response.cookies.set("auth_token", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        sameSite: "strict",
        maxAge: 60 * 60 * 2,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
