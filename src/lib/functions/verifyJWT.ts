import { jwtVerify } from "jose";
import { AUTH_SECRET } from "$env/static/private";
import { signatureAlgorithm } from "$lib/constants/auth";

export default async function verifyJWT(token: string) {
  try {
    const secret = new TextEncoder().encode(AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [signatureAlgorithm],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
