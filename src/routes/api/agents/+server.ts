import serverFetchAPI from "$lib/functions/serverFetchAPI.js";

export async function GET({ cookies }) {
    const response = await serverFetchAPI({ path: "/api/agents", cookies })

    return new Response(response.body, { status: response.status });
}

export async function POST({ request, cookies, url }) {
    const formData = await request.formData();
    const avatarFile = formData.get("avatar") as File | null;

    if (formData.get("responseSyntax") === "none") {
        formData.delete("responseSyntax")
    }

    if (avatarFile && !avatarFile.name && !avatarFile.size) {
        formData.delete("avatar")
    }

    const response = await serverFetchAPI({
        method: "POST",
        path: url.pathname,
        body: formData,
        cookies
    })

    return new Response(response.body, { status: response.status });
}

