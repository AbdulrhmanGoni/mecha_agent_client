import { NODE_ENV } from "$env/static/private";
import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/users", cookies })

    const json = await response.json();
    if (json.error && json.error.startsWith("Invalid Token")) {
        cookies.delete(`${NODE_ENV === "production" ? "__Secure-" : ""}authjs.session-token`, { path: "/" });
    }

    return Response.json(json, { status: response.status });
}

export async function DELETE({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/users", cookies, method: "DELETE" })

    return new Response(response.body, { status: response.status });
}
