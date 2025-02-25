type AgentsState = {
    agents: Agent[];
    isFetching: boolean;
    isFetched: boolean;
    error?: string;
    refetchAgents: () => void;
    actionInProgress: boolean;
}

const agentsState = $state<AgentsState>({
    agents: [],
    isFetching: false,
    isFetched: false,
    refetchAgents: () => { },
    actionInProgress: false,
});

export { agentsState }