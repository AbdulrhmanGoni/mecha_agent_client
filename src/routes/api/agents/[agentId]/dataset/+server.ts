import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function PATCH({ cookies, url }) {

    const response = await serverFetchAPI({
        method: "PATCH",
        path: url.pathname + url.search,
        cookies
    })

    return new Response(response.body, { status: response.status });
}