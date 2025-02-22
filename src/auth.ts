import genJWT from "$lib/functions/genJWT";
import serverFetchAPI from "$lib/functions/serverFetchAPI";
import verifyJWT from "$lib/functions/verifyJWT";
import { CredentialsSignin, SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/sveltekit/providers/credentials";

class SigninError extends CredentialsSignin {
    code = ""
    constructor(message: string) {
        super()
        this.code = message || "Failed signing process"
    }
}

export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email" },
            },
            async authorize(c) {
                try {
                    const response = await serverFetchAPI({
                        path: `/api/auth/sign-${c.username !== "null" ? "up" : "in"}`,
                        method: "POST",
                        body: JSON.stringify({ ...c, signingMethod: "credentials" }),
                        headers: { "Content-Type": "application/json" },
                    })

                    const responseBody = await response.json();

                    if (response.status === 200) {
                        return responseBody.result;
                    }

                    throw new SigninError(responseBody.error);
                } catch (error) {
                    throw new SigninError("Unexpected server error !");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'credentials') {
                return true
            }
        },
        jwt({ token, user }) {
            const { picture, ...restToken } = token;
            return {
                ...restToken,
                name: token.name || user.name,
                avatar: restToken.avatar || picture,
            }
        },
        session({ session, token }) {
            if (token.avatar) {
                Object.assign(session.user, { avatar: token.avatar })
            }

            return session
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },
    jwt: {
        encode: async ({ token, secret }) => {
            if (token && secret) {
                return genJWT(token);
            }
            return '';
        },
        decode: async ({ token, secret }) => {
            if (token && secret) {
                return verifyJWT(token)
            }
            return null;
        },
    },
})
