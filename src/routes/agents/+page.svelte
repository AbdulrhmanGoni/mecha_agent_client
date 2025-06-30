<script lang="ts">
	import { goto } from '$app/navigation';
	import AgentsGrid from '$lib/components/agents/AgentsGrid.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import { agentsState } from '../../stores/agents.svelte';
	import { onMount } from 'svelte';
	import AgentsGridLoading from '$lib/components/agents/AgentsGridLoading.svelte';
	import AgentsGridError from '$lib/components/agents/AgentsGridError.svelte';
	import NoAgentsMessage from '$lib/components/agents/NoAgentsMessage.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';

	function fetchAgents() {
		if (!agentsState.isFetched) {
			agentsState.isFetching = true;
			clientFetchAPI<Agent[]>({ path: '/api/agents' })
				.then((result) => {
					agentsState.agents = result;
					agentsState.isFetched = true;
					agentsState.error = '';
				})
				.catch((error) => {
					agentsState.agents = error;
					agentsState.isFetched = false;
				})
				.finally(() => {
					agentsState.isFetching = false;
				});
		}
	}

	onMount(fetchAgents);

	agentsState.refetchAgents = fetchAgents;
</script>

<div class="space-y-4 py-4 sm:py-12">
	{#if agentsState.error}
		<AgentsGridError errorMessage={agentsState.error} />
	{:else}
		<div>
			<BackButton />
		</div>
		<div class="flex items-center gap-2">
			<h3 class="h3 flex-1 font-bold">
				{#if agentsState.agents.length || agentsState.isFetching}
					Your Agents
				{/if}
			</h3>
			<Button
				size="sm"
				onclick={() => goto('/agents/create')}
				class="variant-filled-primary sm:btn-md"
			>
				<span class="iconify size-[22px] hugeicons--add-square"></span>
				Create Agents
			</Button>
		</div>
		<div class="space-y-4">
			{#if agentsState.isFetching}
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each [1, 2, 3]}
						<AgentsGridLoading />
					{/each}
				</div>
			{:else if agentsState.isFetched}
				{#if agentsState.agents.length}
					<AgentsGrid />
				{:else}
					<NoAgentsMessage />
				{/if}
			{/if}
		</div>
	{/if}
</div>
