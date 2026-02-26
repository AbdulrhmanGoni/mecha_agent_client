import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/users", cookies })

    const json = await response.json();
    if (json.error == "The jwt's signature does not match the verification signature.") {
        cookies.delete("authjs.session-token", { path: "/" });
        cookies.delete("__Secure-authjs.session-token", { path: "/" });
    }

    return new Response(JSON.stringify(json), { status: response.status });
}

export async function DELETE({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/users", cookies, method: "DELETE" })

    return new Response(response.body, { status: response.status });
}
