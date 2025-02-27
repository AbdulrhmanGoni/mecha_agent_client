import serverFetchAPI from '$lib/functions/serverFetchAPI';

export async function GET({ cookies, url }) {
    const response = await serverFetchAPI({ path: url.pathname, cookies })
    return new Response(response.body, { status: response.status });
}

export async function DELETE({ cookies, url }) {
    const response = await serverFetchAPI({
        method: "DELETE",
        path: url.pathname,
        cookies
    })

    return new Response(response.body, { status: response.status });
}

export async function PATCH({ request, cookies, url }) {
    const formData = await request.formData();
    const avatarFile = formData.get("avatar") as File | null;

    if (formData.get("responseSyntax") === "none") {
        formData.delete("responseSyntax")
    }

    if (avatarFile && !avatarFile.name && !avatarFile.size) {
        formData.delete("avatar")
    }

    const response = await serverFetchAPI({
        method: "PATCH",
        path: url.pathname,
        body: formData,
        cookies
    })

    return new Response(response.body, { status: response.status });
}