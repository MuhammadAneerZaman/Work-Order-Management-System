import { Config } from "@/app/config/config";
import { getZohoToken } from "../upstashRedis";

export async function getClientDetailsById(id: string) {
  const url = `${Config.zohoDomain}/report/${Config.client.report}/${id}`;
  try {
    const accessToken = await getZohoToken();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${Config.zohoHeaderKey} ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Data :: ", data);
    return { data, success: true };
  } catch (error) {
    console.log(
      "Error happening in get details of client by vendor file ",
      error,
    );
  }
}
