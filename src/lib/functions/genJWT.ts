import { SignJWT } from "jose";
import { AUTH_SECRET } from "$env/static/private";
import { expirationTime, signatureAlgorithm } from "$lib/constants/auth";

export default async function genJWT(payload: any) {
    const secret = new TextEncoder().encode(AUTH_SECRET);
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: signatureAlgorithm })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(secret);
}
