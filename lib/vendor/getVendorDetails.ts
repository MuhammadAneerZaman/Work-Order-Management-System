import { Config } from "@/app/config/config";
import { getZohoToken } from "../upstashRedis";

export async function getVendorDetails(id: string) {
  // console.log("ID :: ", id);

  try {
    const url = `${Config.zohoDomain}/report/${Config.vendor.report}/${id}`;

    // console.log("Url :: ", url);
    const accessToken = await getZohoToken();

    // console.log("Access Token :: ", accessToken);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${Config.zohoHeaderKey} ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    //     Data ::  {
    //   code: 3000,
    //   data: {
    //     Vendor_Email: 'aneerhaider02@gmail.com',
    //     Vendor_Name: {
    //       prefix: '',
    //       last_name: 'Zaman',
    //       suffix: '',
    //       first_name: 'Muhammad Aneer',
    //       zc_display_value: 'Muhammad Aneer Zaman'
    //     },
    //     Address: {
    //       country: 'Pakistan',
    //       district_city: 'Chiniot',
    //       latitude: '31.72231',
    //       address_line_1: 'Mohallah Kamangran Gali Rasta Bazar',
    //       state_province: 'Punjab',
    //       address_line_2: '',
    //       postal_code: '35400',
    //       zc_display_value: 'Mohallah Kamangran Gali Rasta Bazar, Chiniot, Punjab, 35400, Pakistan',
    //       longitude: '72.98025'
    //     },
    //     Vendor_Phone: '+923213301979',
    //     Standard_Rate: '70.00',
    //     ID: '4893702000000052007',
    //     Hourly_Rate: '20.00'
    //   }
    // }

    const data = await response.json();
    console.log("Data :: ", data);
    return { data, success: true };
  } catch (error) {
    console.log("Error in getVendorDetails.tsx file:: ", error);
    return { success: false };
  } finally {
    console.log("getVendorDetails Functions called");
  }
}

// getVendorDetails("4893702000000052007")
