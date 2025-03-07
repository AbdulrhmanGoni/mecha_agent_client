import clientFetchAPI from "./clientFetchAPI";

export default async function createApiKeyRequest(apiKeysData: CreateApiKeyInput) {
    return clientFetchAPI<ApiKeyRow>({
        path: "/api/api-keys",
        method: "POST",
        body: apiKeysData,
        successStatusCode: 201
    })
};
