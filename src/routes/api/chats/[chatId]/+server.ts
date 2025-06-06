import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function POST({ cookies, url, request }) {
    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname + url.search,
        body: await request.text(),
        cookies
    })

    const newChatId = response.headers.get("chatId");
    return new Response(response.body, { status: response.status, headers: { chatId: newChatId || "" } });
}

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname + url.search,
        cookies
    })

    return new Response(response.body, { status: response.status });
}

export async function DELETE({ cookies, url }) {
    const response = await serverFetchAPI({
        path: url.pathname + url.search,
        cookies,
        method: "DELETE"
    })

    return new Response(response.body, { status: response.status });
}