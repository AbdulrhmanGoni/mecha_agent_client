import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function POST({ cookies, url }) {

    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname,
        cookies
    })

    return new Response(response.body, { status: response.status });
}