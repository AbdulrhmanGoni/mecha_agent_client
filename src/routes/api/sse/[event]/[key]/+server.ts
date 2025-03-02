import { SERVER_HOST } from "$env/static/private";

export async function GET({ cookies, url }) {
    const jwt = cookies.get("Mecha_Agent_JWT");

    const response = await fetch(`${SERVER_HOST}${url.pathname}`, {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Accept": "text/event-stream",
        },
    });

    const headers = new Headers({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });

    return new Response(response.body, { status: response.status, headers });
}
