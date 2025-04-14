type ApiKeyPermission = import("$lib/constants/auth").Permission

type ApiKeyRow = {
    id: string;
    key: string;
    keyName: string;
    expirationDate: string;
    permissions: ApiKeyPermission[];
    status: "Active" | "Inactive";
    createdAt: string;
};

type ApiKeysState = {
    apiKeys: ApiKeyRow[];
    isFetching: boolean;
    isFetched: boolean;
    actionInProgress: boolean;
    error?: string;
    selectedKeys: string[];
    refetchApiKeys: () => void;
    updateApiKeys: (keyIds: string[], newData: Partial<ApiKeyRow>) => void;
    removeApiKeys: (keyIds: string[]) => void;
}

type CreateApiKeyInput = Pick<ApiKeyRow, "keyName" | "permissions"> & {
    maxAgeInDays: number;
};