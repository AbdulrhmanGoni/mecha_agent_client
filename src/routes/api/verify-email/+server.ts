import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({
        path: "/api/auth/verify-email" + url.search,
        cookies
    });

    return new Response(response.body, { status: response.status });
}

export async function POST({ cookies, url }) {
    const response = await serverFetchAPI({
        path: "/api/auth/verify-email" + url.search,
        method: "POST",
        cookies,
    });

    return new Response(response.body, { status: response.status });
}
