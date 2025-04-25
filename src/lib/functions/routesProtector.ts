import { redirect } from "@sveltejs/kit";

const publicRoutes = ["/sign-in"];

type RoutesProtectorParams = {
    locals: App.Locals,
    url: URL,
}

export default async function routesProtector({ locals, url }: RoutesProtectorParams) {
    const session = await locals.auth();

    if (session) {
        if (url.pathname === "/sign-in") {
            redirect(307, '/');
        }

        return { session };
    }

    if (!publicRoutes.includes(url.pathname)) {
        redirect(307, '/sign-in');
    }

    return {
        error: "Failed to authenticate you",
    }
};
