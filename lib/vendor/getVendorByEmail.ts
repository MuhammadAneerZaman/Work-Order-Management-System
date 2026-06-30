import { Config } from "@/app/config/config";
import { getZohoToken } from "../upstashRedis";

export async function getVendorByEmail(email: string) {
  try {
    const token = await getZohoToken();
    const criteria = encodeURIComponent(`Vendor_Email == "${email}"`);
    const url = `${Config.zohoDomain}/report/${Config.vendor.report}?criteria=${criteria}&field_config=detail_view`;
    console.log("Criteria For Get Email :: ", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${Config.zohoHeaderKey} ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error happen in getVendorByEmail file");
  }
}
