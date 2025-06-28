import routesProtector from "$lib/functions/routesProtector";
import serverFetchAPI from "$lib/functions/serverFetchAPI";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url, cookies }) => {
    const { error, session } = await routesProtector({ locals, url });
    const sessionId = url.searchParams.get("session_id");

    if (session) {
        if (sessionId) {
            const res = await serverFetchAPI({
                path: "/api/subscriptions/sessions/verify-session?id=" + sessionId,
                cookies,
            }).then((res) => res.json())

            return {
                session,
                checkSessionSuccess: !!res.result,
            }
        } else {
            redirect(301, "/")
        }
    }

    return error
};
