import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({ cookies, path: url.pathname })

    return new Response(response.body, {
        headers: { "Content-Type": response.headers.get("Content-Type") as string },
        status: response.status
    });
}
