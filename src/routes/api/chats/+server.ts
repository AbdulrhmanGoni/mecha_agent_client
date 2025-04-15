import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname + url.search, cookies
    })

    return new Response(response.body, { status: response.status });
}