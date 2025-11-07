<script lang="ts">
	import { onMount } from 'svelte';
	import InstructionCard from './InstructionCard.svelte';
	import InstructionFullCard from './InstructionFullCard.svelte';
	import {
		datasetInstructionsState,
		fetchDatasetInstructions
	} from '../../../stores/datasetPage.svelte';
	import DatasetInstructionCardLoading from './InstructionCardLoading.svelte';
	import InstructionsBrowserController from './InstructionsBrowserController.svelte';
	import Button from '../shared/Button.svelte';
	import InstructionsSearchField from './InstructionsSearchField.svelte';
	import { page } from '$app/state';

	function fetchInstructions() {
		page.params.datasetId && fetchDatasetInstructions(page.params.datasetId);
	}

	onMount(() => {
		if (!datasetInstructionsState.fetched) {
			fetchInstructions();
		}
	});
</script>

<div class="flex gap-2">
	<div class="basis-1/2 space-y-2">
		<div class="flex justify-between gap-2">
			<h1 class="text-xl font-bold">Instructions</h1>
			{#if datasetInstructionsState.search}
				<div class="flex">
					<span class="primary-text-color me-2 font-semibold">Search:</span>
					<span class="secondary-text-color flex">
						"
						<span style="line-height: 26px;" class="line-clamp-1 max-w-40">
							{datasetInstructionsState.search}
						</span>
						"
					</span>
					<button
						aria-label="Clear Search"
						onclick={() => {
							datasetInstructionsState.search = '';
							fetchInstructions();
						}}
					>
						<span class="iconify ml-1 size-4 -translate-y-1 hugeicons--cancel-01"></span>
					</button>
				</div>
			{/if}
		</div>
		<div class="flex h-[500px] flex-col gap-2">
			<div class="flex flex-1 flex-col gap-2 overflow-y-auto">
				{#if datasetInstructionsState.fetching}
					{#each new Array(4)}
						<DatasetInstructionCardLoading />
					{/each}
				{:else if datasetInstructionsState.error}
					<div class="card h-full space-y-2 px-4 py-10 text-center">
						<p class="text-2xl font-bold text-red-500">Failed to fetch instructions</p>
						<p class="">{datasetInstructionsState.error}</p>
						<Button
							class="variant-ghost-error mx-auto"
							size="sm"
							onclick={() => fetchInstructions()}
						>
							Retry
							<span class="iconify hugeicons--refresh"></span>
						</Button>
					</div>
				{:else if datasetInstructionsState.fetched}
					{#if datasetInstructionsState.instructions.length}
						{#each datasetInstructionsState.instructions as instruction}
							<InstructionCard {instruction} />
						{/each}
					{:else}
						<div class="card h-full">
							<p class="px-4 py-10 text-center">There are no instructions in this dataset</p>
						</div>
					{/if}
				{/if}
			</div>
			<div class="flex justify-between gap-2">
				<InstructionsSearchField />
				<InstructionsBrowserController />
			</div>
		</div>
	</div>
	<div class="h-[500px] basis-1/2 space-y-2">
		<h1 class="text-xl font-bold">Selected Instruction</h1>
		<InstructionFullCard />
	</div>
</div>
