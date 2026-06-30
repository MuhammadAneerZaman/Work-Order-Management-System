import { NextResponse } from "next/server";
import * as argon from "argon2";
import { Config } from "@/app/config/config";
import { SignJWT } from "jose";
import { getZohoToken } from "@/lib/upstashRedis";

export async function POST(request: Request) {
  try {
    const { vendorId, password } = await request.json();
    console.log("Vendor ID :: ", vendorId);
    console.log("Password :: ", password);

    const hashedPassword = await argon.hash(password);

    console.log("Hased Password :: ", hashedPassword);

    const url = `${Config.zohoDomain}/report/${Config.vendor.report}/${vendorId}`;

    console.log("Url :: ",url);
    

    const accessToken = await getZohoToken();

    const payload = { data: {
      Password:hashedPassword
    } }


    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `${Config.zohoHeaderKey} ${accessToken}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload)
    });

    const data = await response.json();

    console.log("Response :: ", data);

    if( data.code == 3000 ){
 return NextResponse.json(
      { message: "Password Created Successfully", success: true, code:data.code },
      { status: 201 },
    );
    }else{
       return NextResponse.json(
      { message: data.message, success: true, code:data.code },
      { status: 400 },)
    }
    

   
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Password Can't Send",
        details: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
