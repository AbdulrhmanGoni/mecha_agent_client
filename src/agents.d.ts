type Agent = {
    id: string;
    agentName: string;
    description: string;
    avatar?: string;
    systemInstructions?: string;
    datasetId?: string | null;
    createdAt: string;
    dontKnowResponse?: string;
    responseSyntax?: "markdown"
    greetingMessage?: string;
    isPublished: boolean;
};
