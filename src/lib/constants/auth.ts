export const permissions = ["read", "write", "inference"] as const;
export type Permission = typeof permissions[number];
export const signatureAlgorithm = "HS512";
export const userAccoutPermissions = permissions;
export const expirationTime = "60d";