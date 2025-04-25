import routesProtector from "$lib/functions/routesProtector";

export const load = async ({ locals, url }) => {
    return routesProtector({ locals, url })
};
