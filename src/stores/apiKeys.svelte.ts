import { permissions } from "$lib/constants/auth";

function updateApiKeys(keyIds: string[], newData: Partial<ApiKeyRow>) {
    apiKeysState.apiKeys = apiKeysState.apiKeys.map((key) => {
        if (keyIds.includes(key.id)) {
            return key = { ...key, ...newData }
        }

        return key
    })
};

function removeApiKeys(keyIds: string[]) {
    apiKeysState.apiKeys = apiKeysState.apiKeys.filter((key) => !keyIds.includes(key.id))
};

const apiKeysState = $state<ApiKeysState>({
    apiKeys: [],
    isFetching: false,
    isFetched: false,
    actionInProgress: false,
    selectedKeys: [],
    refetchApiKeys: () => { },
    updateApiKeys,
    removeApiKeys,
});

const createApiKeysState = $state<CreateApiKeysState>({
    isLoading: false,
    error: ""
});

const apiKeymaxAgeOptions = [7, 15, 30, 60, 90];

export { apiKeysState, createApiKeysState, apiKeymaxAgeOptions }