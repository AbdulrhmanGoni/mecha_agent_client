import serverFetchAPI from "$lib/functions/serverFetchAPI";

export async function PATCH({ request, cookies }) {
    const response = await serverFetchAPI({
        method: "PATCH",
        path: "/api/api-keys/deactivate",
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
        cookies
    })
    return new Response(response.body, { status: response.status })
}
