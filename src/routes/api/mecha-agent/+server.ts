import { SERVER_HOST, NODE_ENV } from "$env/static/private";
import { handler } from "@mecha_agent_inference_client/sveltekit/server";

export const fallback = handler({
    serverHost: NODE_ENV == "development" ? SERVER_HOST : undefined
})
