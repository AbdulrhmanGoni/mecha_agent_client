import { SERVER_HOST } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

type ServerFetchAPIOptions = {
    path: string;
    method?: HTTPRequestMethod;
    body?: RequestInit["body"];
    headers?: Record<string, string>;
    cookies?: Cookies;
}

export default async function serverFetchAPI(options: ServerFetchAPIOptions) {
    const jwt = options.cookies?.get("authjs.session-token");

    const headers = new Headers(options.headers)

    if (jwt) {
        headers.set("Authorization", jwt)
    }

    return await fetch(`${SERVER_HOST}${options.path}`, {
        headers,
        method: options.method,
        body: options.body,
    });
};
