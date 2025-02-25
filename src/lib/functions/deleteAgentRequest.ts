import clientFetchAPI from "./clientFetchAPI";

export default async function deleteAgentRequest(agentId: string) {
    return clientFetchAPI({
        path: "/api/agents/" + agentId,
        method: "DELETE",
    })
};
