type promptRequestOptions = {
    prompt: string,
    chatId: string,
    agent: Agent,
    onData: (data: string) => void,
    onEnd?: (newChatId: string | null) => void,
    onError?: (message: string) => void,
}

export default async function promptRequest(
    { prompt, agent, chatId, onData, onEnd, onError }: promptRequestOptions
) {
    try {
        const response = await fetch(`/api/chats/${chatId}?agentId=` + agent.id, {
            method: "POST",
            body: JSON.stringify({ prompt }),
        })

        if (response.status === 200 && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let done = false;
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                if (readerDone) break;
                onData(decoder.decode(value))
            }
            const newChatId = response.headers.get("chatId");
            onEnd?.(newChatId)
        } else {
            const res = await response.json()
            onError?.(res.error || "Unexpected error !")
        }
    } catch (error: any) {
        onError?.(error?.message || "Unexpected error !")
    }
};
