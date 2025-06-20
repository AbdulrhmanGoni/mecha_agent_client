import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname + url.search,
        cookies
    })

    return new Response(response.body, { status: response.status });
}

export async function POST({ request, cookies, url }) {
    const formData = await request.formData();

    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname + url.search,
        body: JSON.stringify([{
            prompt: formData.get("prompt"),
            response: formData.get("response")
        }]),
        cookies,
        headers: { "Content-Type": "application/json" },
    })

    return new Response(response.body, { status: response.status });
}

export async function PATCH({ request, cookies, url }) {
    const formData = await request.formData();

    const response = await serverFetchAPI({
        method: "PATCH",
        path: url.pathname + url.search,
        body: JSON.stringify([{
            id: formData.get("id"),
            prompt: formData.get("prompt"),
            response: formData.get("response"),
        }]),
        cookies,
        headers: { "Content-Type": "application/json" },
    })

    return new Response(response.body, { status: response.status });
}

export async function DELETE({ request, cookies, url }) {
    const response = await serverFetchAPI({
        method: "DELETE",
        path: url.pathname + url.search,
        body: await request.text(),
        cookies,
        headers: { "Content-Type": "application/json" },
    })

    return new Response(response.body, { status: response.status });
}
