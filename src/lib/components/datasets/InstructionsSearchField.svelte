<script lang="ts">
	import { page } from '$app/state';
	import {
		fetchDatasetInstructions,
		datasetInstructionsState
	} from '../../../stores/datasetPage.svelte';

	function onsubmit(e: SubmitFormEvent) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const search = form.get('searchText')?.toString();

		if (search && datasetInstructionsState.search != search) {
			datasetInstructionsState.search = search;
			datasetInstructionsState.page = 0;
			page.params.datasetId && fetchDatasetInstructions(page.params.datasetId);
		}
	}

	function clearSearchForm() {
		datasetInstructionsState.search = '';
		currentSearchValue = '';
	}

	let currentSearchValue = $state('');
</script>

<form class="variant-ghost-primary flex items-center gap-1.5 rounded-md" {onsubmit}>
	<input
		type="search"
		bind:value={currentSearchValue}
		name="searchText"
		placeholder="Search..."
		class="max-w-52 !border-0 bg-transparent px-2.5 py-1.5 pe-0 !outline-0 !ring-0 md:max-w-72"
	/>
	{#if currentSearchValue}
		<button
			onclick={clearSearchForm}
			class="flex h-full items-center"
			type="reset"
			aria-label="clear search field"
		>
			<span class="iconify size-4 hugeicons--cancel-01"></span>
		</button>
	{/if}
	<button
		class="variant-filled-primary flex h-full items-center rounded-e-md px-2"
		type="submit"
		aria-label="Search"
	>
		<span class="iconify size-4 hugeicons--search-01"></span>
	</button>
</form>

<style>
	input::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
		display: none;
	}

	input:focus {
		outline-width: 0px;
	}
</style>
