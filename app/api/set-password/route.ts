import { NextResponse } from "next/server";
import * as argon from "argon2";
import { Config } from "@/app/config/config";
import { SignJWT } from "jose";
import { getZohoToken } from "@/lib/upstashRedis";

export async function POST(request: Request) {
  try {
    const { id, password, type } = await request.json();
    console.log("ID :: ", id);
    console.log("Password :: ", password);

    const hashedPassword = await argon.hash(password);

    console.log("Hased Password :: ", hashedPassword);

    const accessToken = await getZohoToken();

    if (type == "vendor") {
      const url = `${Config.zohoDomain}/report/${Config.vendor.report}/${id}`;

      const payload = {
        data: {
          Password: hashedPassword,
        },
      };

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `${Config.zohoHeaderKey} ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Response :: ", data);

      if (data.code == 3000) {
        return NextResponse.json(
          {
            message: "Password Created Successfully",
            success: true,
            code: data.code,
          },
          { status: 201 },
        );
      } else {
        return NextResponse.json(
          { message: data.message, success: false, code: data.code },
          { status: 400 },
        );
      }
    }

    if (type == "client") {
      const url = `${Config.zohoDomain}/report/${Config.client.report}/${id}`;

      const payload = {
        data: {
          Password: hashedPassword,
        },
      };

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `${Config.zohoHeaderKey} ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Response :: ", data);

      if (data.code == 3000) {
        return NextResponse.json(
          {
            message: "Password Created Successfully",
            success: true,
            code: data.code,
          },
          { status: 201 },
        );
      } else {
        return NextResponse.json(
          { message: data.message, success: false, code: data.code },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      {
        message: "Password Can't Send",
        success: false,
      },
      { status: 500 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Password Can't Send",
        details: error.message,
        success: false,
      },
      { status: 500 },
    );
  }
}
