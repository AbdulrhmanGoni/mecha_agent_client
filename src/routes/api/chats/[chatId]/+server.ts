import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function POST({ cookies, url, request }) {
    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname + url.search,
        body: await request.text(),
        cookies
    })

    return new Response(response.body, { status: response.status, headers: response.headers });
}

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname + url.search,
        cookies
    })

    return new Response(response.body, { status: response.status });
}

