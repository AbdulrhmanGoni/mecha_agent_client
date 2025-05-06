import { signIn } from "../../auth"
import type { Actions } from "./$types"
import routesProtector from "$lib/functions/routesProtector";
import type { PageServerLoad } from "./$types";

export const actions: Actions = { default: signIn }

export const load: PageServerLoad = async ({ locals, url }) => {
    return routesProtector({ locals, url })
};
