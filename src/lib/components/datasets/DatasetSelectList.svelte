<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { datasetsState, fetchDatasets } from '../../../stores/datasets.svelte';
	import { onMount } from 'svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { page } from '$app/stores';
	import Divider from '../shared/Divider.svelte';
	import timeAgo from '$lib/functions/timeAgo';
	import type { Writable } from 'svelte/store';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import { agentsState } from '../../../stores/agents.svelte';

	const toast = getToastStore();

	let { isAssociating }: { isAssociating: Writable<boolean> } = $props();

	function onSelection(dataset: Dataset): void {
		if (!$isAssociating) {
			isAssociating.set(true);
			clientFetchAPI<string>({
				path: `/api/agents/${$page.params.agentId}/dataset?action=associate&datasetId=${dataset.id}`,
				method: 'PATCH'
			})
				.then((res) => {
					if (agentPageState.agent) {
						agentPageState.agent.datasetId = dataset.id;
					}

					if (agentsState.agents.length) {
						agentsState.agents = agentsState.agents.map((agent) => {
							if (agent.id === $page.params.agentId) {
								agent.datasetId = dataset.id;
							}
							return agent;
						});
					}

					toast.trigger({
						message: res,
						background: 'variant-filled-success'
					});
				})
				.catch((error) => {
					toast.trigger({
						message: error,
						background: 'variant-filled-error'
					});
				})
				.finally(() => {
					isAssociating.set(false);
				});
		}
	}

	onMount(() => {
		if (!datasetsState.fetched && !datasetsState.fetching && !datasetsState.error) {
			fetchDatasets();
		}
	});
</script>

<div class="space-y-2">
	<ul
		class="card variant-outline-primary flex max-h-48 min-w-60 flex-col space-y-1 overflow-y-auto p-2"
		tabindex="-1"
	>
		{#if datasetsState.fetching}
			<div class="placeholder h-10 w-full"></div>
			<div class="placeholder h-10 w-full"></div>
			<div class="placeholder h-10 w-full"></div>
		{:else if datasetsState.error}
			<div class="space-y-2 p-2">
				<p class="flex items-center gap-2 font-semibold text-error-500">
					<span class="iconify relative size-5 hugeicons--alert-01"></span>
					Failed to fetch datasets
				</p>
				<p class="text-sm">{datasetsState.error}</p>
				<button
					onclick={fetchDatasets}
					class="variant-ghost-error flex items-center gap-2 rounded-md px-2 py-1 text-sm"
				>
					retry
					<span class="iconify relative size-4 hugeicons--refresh"></span>
				</button>
			</div>
		{:else if datasetsState.fetched}
			{#each datasetsState.datasets as dataset, i}
				<li>
					<button
						class="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-primary-500/30"
						onclick={() => onSelection(dataset)}
					>
						<span class="iconify relative size-6 hugeicons--database"></span>
						<p class="flex flex-col items-start">
							<span>
								{dataset.title}
							</span>
							<span class="secondary-text-color text-xs">
								last modified: {timeAgo(new Date(dataset.updatedAt))}
							</span>
						</p>
					</button>
				</li>
				{#if datasetsState.datasets.length - 1 !== i}
					<Divider />
				{/if}
			{/each}
		{/if}
	</ul>
</div>
