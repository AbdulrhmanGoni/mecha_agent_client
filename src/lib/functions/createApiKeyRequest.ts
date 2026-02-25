import clientFetchAPI from "./clientFetchAPI";

export default async function createApiKeyRequest(apiKeysData: CreateApiKeyInput) {
    return clientFetchAPI<{ record: ApiKeyRow, key: string }>({
        path: "/api/api-keys",
        method: "POST",
        body: apiKeysData,
        successStatusCode: 201
    })
};
