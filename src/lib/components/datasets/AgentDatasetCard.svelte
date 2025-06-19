<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../shared/Button.svelte';
	import NoDatasetMessage from '../datasets/NoDatasetMessage.svelte';
	import { datasetPageState, fetchDataset } from '../../../stores/datasetPage.svelte';
	import { goto } from '$app/navigation';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import UnassociateDatasetWithAgentButton from '../datasets/UnassociateDatasetWithAgentButton.svelte';

	onMount(() => {
		agentPageState.agent?.datasetId && fetchDataset(agentPageState.agent.datasetId);
	});
</script>

{#if agentPageState.agent?.datasetId}
	{#if datasetPageState.isFetching}
		<div class="space-y-2 py-3">
			<div class="flex items-center gap-2">
				<div class="placeholder size-7 animate-pulse"></div>
				<div class="placeholder h-7 w-60 animate-pulse"></div>
			</div>
			<div class="placeholder h-16 w-full animate-pulse"></div>
			<div class="placeholder h-8 w-28 animate-pulse"></div>
		</div>
	{:else if datasetPageState.error}
		{datasetPageState.error}
	{:else if datasetPageState.isFetched && datasetPageState.dataset}
		<div>
			<div class="mb-2 flex items-center gap-2">
				<span class="iconify size-7 hugeicons--database"></span>
				<h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Dataset</h5>
			</div>
			<div class="mb-3 space-y-1">
				<p class="text-lg font-semibold">{datasetPageState.dataset.title}</p>
				<p class="text-sm">{datasetPageState.dataset.description}</p>
				<p class="font-semibold">
					Instructions:
					<span class="variant-ghost-primary badge ms-1 px-2 py-0.5">
						{datasetPageState.dataset.instructionsCount}
					</span>
				</p>
			</div>
			<div class="flex gap-2">
				<Button
					size="sm"
					class="variant-filled-primary gap-2"
					onclick={() => {
						goto('/datasets/' + datasetPageState.dataset!.id);
					}}
				>
					Open
					<span class="iconify size-4 hugeicons--link-square-02"></span>
				</Button>
				<UnassociateDatasetWithAgentButton datasetId={datasetPageState.dataset!.id} />
			</div>
		</div>
	{/if}
{:else}
	<NoDatasetMessage />
{/if}
