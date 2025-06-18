import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function PATCH({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname,
        method: "PATCH",
        cookies,
    })

    return new Response(response.body, { status: response.status });
}
