export interface PincodeInfo {
  city: string;
  state: string;
  estimatedDays: number;
}

const PINCODE_PREFIX_MAP: Record<string, { city: string; state: string; estimatedDays: number }> = {
  // Delhi NCR
  "11": { city: "New Delhi", state: "Delhi NCR", estimatedDays: 2 },
  "12": { city: "Gurugram / Faridabad", state: "Haryana", estimatedDays: 2 },
  "20": { city: "Noida / Ghaziabad", state: "Uttar Pradesh", estimatedDays: 2 },

  // Maharashtra
  "40": { city: "Mumbai", state: "Maharashtra", estimatedDays: 2 },
  "41": { city: "Pune", state: "Maharashtra", estimatedDays: 2 },
  "42": { city: "Nashik", state: "Maharashtra", estimatedDays: 3 },
  "44": { city: "Nagpur", state: "Maharashtra", estimatedDays: 3 },

  // Karnataka
  "56": { city: "Bengaluru", state: "Karnataka", estimatedDays: 2 },
  "57": { city: "Mangaluru / Mysuru", state: "Karnataka", estimatedDays: 3 },

  // Tamil Nadu
  "60": { city: "Chennai", state: "Tamil Nadu", estimatedDays: 2 },
  "64": { city: "Coimbatore", state: "Tamil Nadu", estimatedDays: 3 },

  // Telangana & Andhra
  "50": { city: "Hyderabad", state: "Telangana", estimatedDays: 2 },
  "53": { city: "Visakhapatnam", state: "Andhra Pradesh", estimatedDays: 3 },

  // West Bengal
  "70": { city: "Kolkata", state: "West Bengal", estimatedDays: 3 },

  // Gujarat
  "38": { city: "Ahmedabad", state: "Gujarat", estimatedDays: 2 },
  "39": { city: "Surat / Vadodara", state: "Gujarat", estimatedDays: 2 },

  // Rajasthan
  "30": { city: "Jaipur", state: "Rajasthan", estimatedDays: 2 },
  "34": { city: "Jodhpur", state: "Rajasthan", estimatedDays: 3 },

  // Punjab & Chandigarh
  "16": { city: "Chandigarh", state: "Chandigarh", estimatedDays: 2 },
  "14": { city: "Ludhiana / Jalandhar", state: "Punjab", estimatedDays: 3 },

  // Madhya Pradesh
  "45": { city: "Indore", state: "Madhya Pradesh", estimatedDays: 3 },
  "46": { city: "Bhopal", state: "Madhya Pradesh", estimatedDays: 3 },

  // Kerala
  "68": { city: "Kochi", state: "Kerala", estimatedDays: 3 },
  "69": { city: "Thiruvananthapuram", state: "Kerala", estimatedDays: 3 },

  // Goa
  "403": { city: "Panaji", state: "Goa", estimatedDays: 3 },
};

export function lookupIndianPincode(pincode: string): PincodeInfo | null {
  const cleanPin = pincode.trim().replace(/\D/g, "");
  if (cleanPin.length < 2) return null;

  // Try 3-digit prefix then 2-digit prefix
  const prefix3 = cleanPin.substring(0, 3);
  if (PINCODE_PREFIX_MAP[prefix3]) return PINCODE_PREFIX_MAP[prefix3];

  const prefix2 = cleanPin.substring(0, 2);
  if (PINCODE_PREFIX_MAP[prefix2]) return PINCODE_PREFIX_MAP[prefix2];

  return null;
}
