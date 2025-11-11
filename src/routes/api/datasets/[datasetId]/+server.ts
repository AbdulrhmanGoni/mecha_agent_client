import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({ path: url.pathname, cookies })

    return new Response(response.body, { status: response.status });
}

export async function PATCH({ request, cookies, url }) {
    const response = await serverFetchAPI({
        method: "PATCH",
        path: url.pathname,
        cookies,
        headers: { "content-type": "application/json" },
        body: await request.text()
    })

    return new Response(response.body, { status: response.status });
}

export async function DELETE({ cookies, url }) {
    const response = await serverFetchAPI({
        method: "DELETE",
        path: url.pathname + url.search,
        cookies
    })

    return new Response(response.body, { status: response.status });
}
