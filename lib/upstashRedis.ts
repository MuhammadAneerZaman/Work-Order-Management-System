import { Config } from "@/app/config/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: Config.upstashRedisUrl,
  token: Config.upstashRedisToken,
});

export async function getZohoToken(): Promise<string> {
  const cacheKey = "zoho:access_token";

  const zohoAccessToken = await redis.get<string>(cacheKey);

  if (!zohoAccessToken) {
    const storedToken = await setZohoToken();
    return storedToken;
  }

  return zohoAccessToken;
}

export async function setZohoToken() {
  const cacheKey = "zoho:access_token";

  const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${Config.zohoRefreshToken}&client_id=${Config.zohoClientId}&client_secret=${Config.zohoClientSecret}&grant_type=refresh_token`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error("Failed upstream token authority refresh");
  }
  const data = await response.json();

  console.log("Token Response Data :: ", data);
  

  await redis.set(cacheKey, data.access_token, { ex: data.expires_in });

  return data.access_token;
}
