import { getZohoToken } from "../upstashRedis";

export async function getVendorByEmail(email: string){
    try {
    const access = await getZohoToken();
        const criteria = encodeURIComponent(`Vendor_Email == ${email}`);
        console.log("Criteria For Get Email :: ", criteria);
        
    } catch (error) {
        console.log("Error happen in getVendorByEmail file");
        
    }
}