import { SERVER_HOST, NODE_ENV } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

type ServerFetchAPIOptions = {
    path: string;
    method?: HTTPRequestMethod;
    body?: RequestInit["body"];
    headers?: Record<string, string>;
    cookies?: Cookies;
}

export default async function serverFetchAPI(options: ServerFetchAPIOptions) {
    const jwt = options.cookies?.get(`${NODE_ENV === "production" ? "__Secure-" : ""}authjs.session-token`);

    const headers = new Headers(options.headers)

    if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`)
    }

    return await fetch(`${SERVER_HOST}${options.path}`, {
        headers,
        method: options.method,
        body: options.body,
    });
};
