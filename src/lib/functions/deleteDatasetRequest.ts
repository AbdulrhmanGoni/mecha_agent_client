import clientFetchAPI from "./clientFetchAPI";

export default async function deleteDatasetRequest(agentId: string, datasetId: string) {
    return clientFetchAPI({
        path: `/api/datasets/${datasetId}?agentId=${agentId}`,
        method: "DELETE",
    })
};
