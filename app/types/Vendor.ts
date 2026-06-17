export type VendorStatus = "Pending" | "Active" | "Suspended" | "Out of service" | "Expired" ;

export interface ZohoName {
  first_name: string;
  last_name: string;
}

export interface ZohoAddress {
  address_line_1: string;
  district_city: string;
  state_province: string;
  postal_Code: string;
  country: string;
}

export interface ZohoVendorField {
  ID?: number;
  Vendor_Name: ZohoName;
  Vendor_Email: string;
  Vendor_Phone: string;
  Capabilities?: string;
  Standard_Rate?: number;
  Hourly_Rate?: number;
  Address?: ZohoAddress;
  Vendor_Photo_URL?: string;
  Status: VendorStatus;
  Verification: boolean;
  Verification_Code?: number;
  Email_Verification_Code?: string;
  Password?: string;
  Registered_Date?: string;
}