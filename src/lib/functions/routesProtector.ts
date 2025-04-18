import { redirect } from "@sveltejs/kit";

const publicRoutes = ["/sign-in"];

export default async function routesProtector({ locals, url }: { locals: App.Locals, url: URL }) {
    const session = await locals.auth();

    if (session) {
        if (url.pathname === "/sign-in") {
            redirect(307, '/');
        }

        return session;
    }

    if (!publicRoutes.includes(url.pathname)) {
        redirect(307, '/sign-in');
    }

    return {
        error: "Failed to authenticate you",
    }
};
