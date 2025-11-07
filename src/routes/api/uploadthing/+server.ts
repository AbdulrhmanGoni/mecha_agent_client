import { env } from "$env/dynamic/private";
import { ourFileRouter } from "$lib/functions/uploadthing";
import { createRouteHandler } from "uploadthing/server";
import type { RequestEvent } from "./$types";

const handlers = createRouteHandler({
    router: ourFileRouter,
    config: {
        token: env.UPLOADTHING_TOKEN,
    },
});

async function auth(e: RequestEvent) {
    const session = await e.locals.auth();
    e.request.headers.set("userEmail", String(session?.user?.email));
    return handlers(e)
}

export { auth as GET, auth as POST };
