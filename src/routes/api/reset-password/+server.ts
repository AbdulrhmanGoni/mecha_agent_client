import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function POST({ request, cookies }) {
    const response = await serverFetchAPI({
        path: "/api/auth/reset-password",
        method: "POST",
        cookies,
        body: await request.text(),
        headers: { "Content-Type": "application/json" }
    });

    return new Response(response.body, { status: response.status });
}
