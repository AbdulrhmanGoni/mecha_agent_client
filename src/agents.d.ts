type Dataset = {
    id: string;
    title: string;
    description: string;
    agentId: string;
    status: "processing" | "processed" | "unprocessed";
    createdAt: string;
}

type Agent = {
    id: string;
    agentName: string;
    description: string;
    avatar?: string;
    systemInstructions?: string;
    dataset?: Dataset;
    createdAt: string;
    dontKnowResponse?: string;
    responseSyntax?: "markdown"
    greetingMessage?: string;
    isPublished: boolean;
};
