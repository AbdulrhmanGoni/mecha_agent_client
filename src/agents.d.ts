type Agent = {
    id: string;
    agentName: string;
    description: string;
    avatar?: string;
    systemInstructions?: string;
    datasetId?: string | null;
    createdAt: string;
    dontKnowResponse?: string;
    greetingMessage?: string;
    isPublished: boolean;
};
