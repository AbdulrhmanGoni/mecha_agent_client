<script lang="ts">
	import DatasetCard from '$lib/components/datasets/DatasetCard.svelte';
	import { onMount } from 'svelte';
	import { fetchDatasets, datasetsState } from '../../stores/datasets.svelte';
	import ErrorPage from '$lib/components/shared/ErrorPage.svelte';
	import DatasetsLoadingCard from '$lib/components/datasets/DatasetsLoadingCard.svelte';
	import CreateDatasetButton from '$lib/components/datasets/CreateDatasetButton.svelte';

	onMount(fetchDatasets);
</script>

<div class="mt-7 space-y-4 sm:mt-14">
	<div class="flex items-center gap-2">
		<span class="iconify size-6 hugeicons--database sm:size-7"></span>
		<h1 class="flex-1 text-xl font-bold sm:text-2xl">Your Datasets</h1>
		<CreateDatasetButton />
	</div>
	{#if datasetsState.error}
		<ErrorPage
			title="Failed to fetch the datasets"
			errorMessage={datasetsState.error}
			iconName="hugeicons--rss-error"
			retryFn={fetchDatasets}
		/>
	{:else}
		<div class="grid max-h-[500px] gap-3 overflow-auto pe-1 md:grid-cols-2">
			{#if datasetsState.fetching}
				{#each new Array(4)}
					<DatasetsLoadingCard />
				{/each}
			{:else if datasetsState.fetched}
				{#if datasetsState.datasets.length}
					{#each datasetsState.datasets as dataset}
						<DatasetCard {...dataset} />
					{/each}
				{:else}
					<div class="col-span-2">
						<ErrorPage
							title="No datasets"
							errorMessage={`You don't have datasets now, Click on "Create" button in the top right to create one`}
							iconName="hugeicons--database"
							retryFn={fetchDatasets}
							hideRetryButton
							hideBackButton
						/>
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
