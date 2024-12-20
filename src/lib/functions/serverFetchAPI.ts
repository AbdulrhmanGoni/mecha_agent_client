import { SERVER_HOST } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

type ServerFetchAPIOptions = {
    path: string;
    method?: string;
    body?: RequestInit["body"];
    headers?: Record<string, string>;
    cookies: Cookies;
}

export default async function serverFetchAPI(options: ServerFetchAPIOptions) {
    const jwt = options.cookies.get("Mecha_Agent_JWT");
    return await fetch(`${SERVER_HOST}${options.path}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            ...options.headers
        },
        method: options.method,
        body: options.body,
    });
};
