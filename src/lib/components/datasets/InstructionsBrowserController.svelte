<script lang="ts">
	import { page } from '$app/stores';
	import {
		datasetInstructionsState,
		fetchDatasetInstructions
	} from '../../../stores/datasetPage.svelte';
	import Button from '../shared/Button.svelte';

	function navigate(pageNumber: number) {
		datasetInstructionsState.page = pageNumber;
		fetchDatasetInstructions($page.params.datasetId);
	}

	function goToNextPage() {
		navigate(datasetInstructionsState.page + 1);
	}

	function goToPrevPage() {
		navigate(datasetInstructionsState.page - 1);
	}

	const noPrevPage = $derived(datasetInstructionsState.page === 0);
	const noNextPage = $derived(
		datasetInstructionsState.instructions.length < datasetInstructionsState.pageSize
	);
</script>

<div class="flex items-center gap-2">
	<Button
		class="variant-ghost-primary {noPrevPage ? 'cursor-not-allowed opacity-50' : ''}"
		disabled={noPrevPage}
		size="sm"
		onclick={goToPrevPage}
	>
		<span class="iconify size-5 hugeicons--arrow-left-01"></span>
		Prev
	</Button>
	<span class="text-nowrap font-bold">Page {datasetInstructionsState.page + 1}</span>
	<Button
		size="sm"
		onclick={goToNextPage}
		class="variant-ghost-primary {noNextPage ? 'cursor-not-allowed opacity-50' : ''}"
		disabled={noNextPage}
	>
		Next
		<span class="iconify size-5 hugeicons--arrow-right-01"></span>
	</Button>
</div>
