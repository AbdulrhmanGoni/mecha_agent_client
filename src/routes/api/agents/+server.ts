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
        path: "/api/agents",
        body: formData,
        cookies
    })

    if (response.status === 201) {
        return new Response(null, {
            status: 302,
            headers: new Headers({ Location: '/agents' })
        });
    } else {
        const redirectUrl = new URL(url.origin);
        const res = await response.json()
        redirectUrl.searchParams.set("error", res.error || "an error happened while creating the agent");
        return Response.redirect(redirectUrl);
    }
}

