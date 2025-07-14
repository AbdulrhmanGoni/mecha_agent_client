import clientFetchAPI from "$lib/functions/clientFetchAPI";

export const openedChatState = $state<OpenedChatState>({
    chatFeed: [],
    isGenerating: false,
    isFetching: false,
    isFetched: false,
    reGenerate: () => { },
    currentPrompt: ""
});

export const chatsHistoryState = $state<ChatsState>({
    chatsHistory: [],
    isFetched: false,
    isFetching: false,
    reFetched() { },
    actionInProgress: false,
});

export function resetOpenedChatState() {
    openedChatState.chatFeed = [];
    openedChatState.reGenerate = () => { };
    openedChatState.currentPrompt = '';
    openedChatState.isGenerating = false;
    openedChatState.error = "";
    openedChatState.isFetching = false;
    openedChatState.isFetched = false;
}

export function resetChatsHistoryState() {
    chatsHistoryState.isFetching = false;
    chatsHistoryState.isFetched = false;
    chatsHistoryState.chatsHistory = [];
}

export function fetchAgentChats(agentId: string) {
    if (!chatsHistoryState.isFetched) {
        chatsHistoryState.isFetching = true;
        clientFetchAPI<ChatHistory[]>({ path: `/api/chats?agentId=${agentId}` })
            .then((result) => {
                chatsHistoryState.isFetched = true;
                chatsHistoryState.chatsHistory = result;
                chatsHistoryState.error = '';
            })
            .catch((error) => {
                chatsHistoryState.error = error;
            })
            .finally(() => {
                chatsHistoryState.isFetching = false;
            });
    }
};

export function fetchChatMessages(agentId: string, chatId: string) {
    openedChatState.isFetching = true;

    clientFetchAPI<ChatHistory["messages"]>({ path: `/api/chats/${chatId}?agentId=${agentId}` })
        .then((result) => {
            openedChatState.chatFeed = result;
            openedChatState.isFetched = true;
            openedChatState.error = "";
        })
        .catch((error) => {
            openedChatState.error = error;
        })
        .finally(() => {
            openedChatState.isFetching = false;
        });
};
