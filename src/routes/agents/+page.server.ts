import routesProtector from "$lib/functions/routesProtector";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
    return routesProtector({ locals, url })
};
