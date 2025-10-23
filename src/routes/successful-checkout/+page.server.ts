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
                path: "/api/subscriptions/sessions/successful-checkout?id=" + sessionId,
                cookies,
            }).then((res) => res.json())

            if (res.result) {
                return { session, result: res.result }
            } else {
                redirect(302, "/")
            }
        } else {
            redirect(302, "/")
        }
    }

    return error
};
