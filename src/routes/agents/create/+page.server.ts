import routesProtector from "$lib/functions/routesProtector";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url, cookies }) => {
    return routesProtector({ locals, url, cookies })
};
