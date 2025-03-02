import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function DELETE({ cookies, url }) {
    const response = await serverFetchAPI({
        method: "DELETE",
        path: url.pathname + url.search,
        cookies
    })

    return new Response(response.body, { status: response.status });
}
