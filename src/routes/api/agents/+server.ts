import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/agents", cookies })

    return new Response(response.body, { status: response.status });
}

export async function POST({ request, cookies, url }) {
    const data = await request.json();

    if (data.responseSyntax == "none") {
        delete data.responseSyntax
    }

    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname,
        body: JSON.stringify(data),
        cookies
    })

    return new Response(response.body, { status: response.status });
}

