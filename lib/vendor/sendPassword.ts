import { getZohoToken } from "../upstashRedis";

export async function setPassword(id:String, password: String) {
    try {
        const accessToken = await getZohoToken();
        
        
    } catch (error) {
        console.log("Error occuring in SendPassword file", error);
        return false;        
    }
}