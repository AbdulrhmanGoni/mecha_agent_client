type ChatMessage = {
    role: "user" | "agent";
    content: string;
    isGenerating?: boolean;
    error?: string;
}

type ChatHistory = {
    id: string;
    agentId: string;
    title: string;
    messages: ChatMessage[];
    startedAt: string;
}

type OpenedChatState = {
    chatFeed: ChatMessage[];
    isGenerating: boolean;
    isFetching: boolean;
    isFetched: boolean;
    error?: string;
    reGenerate: () => void;
    currentPrompt: string;
}

type ChatsState = {
    chatsHistory: ChatHistory[];
    isFetching: boolean;
    isFetched: boolean;
    actionInProgress: boolean,
    reFetched: () => void;
    error?: string;
}