import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function DELETE({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname,
        method: "DELETE",
        cookies,
    })

    return new Response(response.body, { status: response.status });
}
