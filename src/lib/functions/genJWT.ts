import { SignJWT } from "jose";
import { AUTH_SECRET } from "$env/static/private";
import { expirationTime, userAccoutPermissions, signatureAlgorithm } from "$lib/constants/auth";

export default async function genJWT(payload: any) {
    const secret = new TextEncoder().encode(AUTH_SECRET);
    return await new SignJWT({ ...payload, permissions: userAccoutPermissions })
        .setProtectedHeader({ alg: signatureAlgorithm })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(secret);
}
