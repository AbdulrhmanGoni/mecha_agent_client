import clientFetchAPI from "$lib/functions/clientFetchAPI";
import { onMount } from "svelte";
import { agentsState } from "./agents.svelte";

type AgentPageState = {
    agent?: Agent;
    isFetching: boolean;
    isFetched: boolean;
    error?: string;
    refetchAgent: () => void;
}

export const agentPageState = $state<AgentPageState>({
    isFetching: false,
    isFetched: false,
    refetchAgent: () => { },
});

export function fetchAgentState(agentId?: string) {
    async function agentFetcher() {
        agentPageState.isFetching = true;
        clientFetchAPI<Agent>({ path: '/api/agents/' + agentId })
            .then((agent) => {
                agentPageState.agent = agent;
                if (agentsState.agents.length) {
                    for (let i = 0; i < agentsState.agents.length; i++) {
                        if (agentsState.agents[i].id === agent.id) {
                            agentsState.agents[i] = agent
                        }
                    }
                }
                agentPageState.error = '';
            })
            .catch((error) => {
                agentPageState.error = error;
            })
            .finally(() => {
                agentPageState.isFetching = false;
            });
    }

    onMount(() => {
        if (!agentPageState.agent || agentId !== agentPageState.agent.id) {
            agentFetcher()
        }
    });

    agentPageState.refetchAgent = agentFetcher;
};
