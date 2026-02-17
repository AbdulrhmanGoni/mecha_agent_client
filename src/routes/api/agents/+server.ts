import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/agents", cookies })

    return new Response(response.body, { status: response.status });
}

export async function POST({ request, cookies, url }) {
    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname,
        body: await request.text(),
        headers: { "content-type": "application/json" },
        cookies
    })

    return new Response(response.body, { status: response.status });
}

