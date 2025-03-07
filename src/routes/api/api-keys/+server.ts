import serverFetchAPI from "$lib/functions/serverFetchAPI";

export async function POST({ request, cookies }) {
    const response = await serverFetchAPI({
        method: "POST",
        path: "/api/api-keys",
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
        cookies
    })

    return new Response(response.body, { status: response.status })
}

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/api-keys", cookies });

    return new Response(response.body, { status: response.status })
}

export async function DELETE({ request, cookies }) {
    const response = await serverFetchAPI({
        method: "DELETE",
        path: "/api/api-keys",
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
        cookies
    })

    return new Response(response.body, { status: response.status })
}
