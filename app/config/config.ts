export const Config = {
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
  cloudinaryApikey: process.env.COUDINARY_APIKEY,
  zohoDomain: "https://www.zohoapis.com/creator/v2.1/data/aneerzaman1/work-order-management-system",
  zohoAccessToken: process.env.ZohoAccessToken,
  zohoRefreshToken: process.env.ZohoRefreshToken,
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
  zohoClientId: process.env.ZOHO_CLIENT_ID,
  zohoClientSecret: process.env.ZOHO_CLIENT_SECRET,
  vendor: {
    form: "Vendors",
    report: "All_Vendors",
  },
  zohoHeaderKey: "Zoho-oauthtoken",
  frontendUrl:process.env.BASE_URL,
  jwtSecret:process.env.JWT_SECRET
};
