<script lang="ts">
	import DatasetFullCard from '$lib/components/datasets/DatasetFullCard.svelte';
	import DatasetFullCardError from '$lib/components/datasets/DatasetFullCardError.svelte';
	import DatasetFullCardLoading from '$lib/components/datasets/DatasetFullCardLoading.svelte';
	import InstructionsBrowser from '$lib/components/datasets/InstructionsBrowser.svelte';
	import {
		datasetInstructionsState,
		datasetPageState,
		fetchDataset,
		resetDatasetPageState
	} from '../../../stores/datasetPage.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import AddInstructionsForm from '$lib/components/datasets/AddInstructionsForm.svelte';
	import EditInstructionsForm from '$lib/components/datasets/EditInstructionsForm.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import { beforeNavigate } from '$app/navigation';

	onMount(() => {
		fetchDataset($page.params.datasetId);
	});

	beforeNavigate(() => {
		resetDatasetPageState();
	});
</script>

<div class="space-y-4 sm:mt-5">
	<div class="space-y-5">
		<BackButton />
		{#if datasetPageState.isFetching}
			<DatasetFullCardLoading />
		{:else if datasetPageState.error}
			<DatasetFullCardError />
		{:else if datasetPageState.isFetched && datasetPageState.dataset}
			<DatasetFullCard dataset={datasetPageState.dataset} />
		{/if}

		{#if datasetPageState.isFetched && datasetPageState.dataset}
			{#if datasetInstructionsState.openAddInstructionsForm}
				<AddInstructionsForm />
			{:else if datasetInstructionsState.openEditInstructionsForm}
				<EditInstructionsForm />
			{:else}
				<InstructionsBrowser />
			{/if}
		{/if}
	</div>
</div>
