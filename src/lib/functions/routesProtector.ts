import { redirect, type Cookies } from "@sveltejs/kit";
import serverFetchAPI from "./serverFetchAPI";

const publicRoutes = ["/sign-in"];

type RoutesProtectorParams = {
    locals: App.Locals,
    url: URL,
    cookies?: Cookies
}

export default async function routesProtector({ locals, url, cookies }: RoutesProtectorParams) {
    const session = await locals.auth();

    if (session) {
        if (url.pathname === "/sign-in") {
            redirect(307, '/');
        }

        const res = await serverFetchAPI({ path: '/api/users', cookies })
            .then((res) => res.json())

        return {
            user: {
                ...session.user,
                ...res.result
            }
        };
    }

    if (!publicRoutes.includes(url.pathname)) {
        redirect(307, '/sign-in');
    }

    return {
        error: "Failed to authenticate you",
    }
};
