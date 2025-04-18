import routesProtector from "$lib/functions/routesProtector";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url, cookies }) => {
    return routesProtector({ locals, url, cookies })
};
