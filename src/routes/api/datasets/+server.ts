import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/datasets", cookies })

    return new Response(response.body, { status: response.status });
}

export async function POST({ request, cookies, url }) {
    const formData = await request.formData();

    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname,
        body: formData,
        cookies
    })

    return new Response(response.body, { status: response.status });
}
