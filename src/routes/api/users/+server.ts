import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/users", cookies })

    return new Response(response.body, { status: response.status });
}
