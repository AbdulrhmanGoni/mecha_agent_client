<script lang="ts">
	import AgentPageLoading from '$lib/components/agents/AgentPageLoading.svelte';
	import AgentPageError from '$lib/components/agents/AgentPageError.svelte';
	import { fetchAgentState, agentPageState } from '../../../stores/agentPage.svelte';
	import { page } from '$app/stores';
	import AgentPageFullCard from '$lib/components/agents/AgentPageFullCard.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';

	fetchAgentState($page.params.agentId);
</script>

{#if agentPageState.isFetching}
	<AgentPageLoading />
{:else if agentPageState.error}
	<AgentPageError errorMessage={agentPageState.error} />
{:else if agentPageState.agent}
	<div class="space-y-3 py-6">
		<BackButton target="/agents" />
		<AgentPageFullCard agent={agentPageState.agent} />
	</div>
{/if}
