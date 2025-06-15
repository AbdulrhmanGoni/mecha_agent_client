<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import DatasetSelectList from './DatasetSelectList.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import { writable } from 'svelte/store';

	const datasetsPopup: PopupSettings = {
		event: 'click',
		target: 'datasets-list',
		placement: 'bottom-start'
	};

	const isAssociating = writable(false);
</script>

<div class="flex flex-1 flex-col gap-3">
	<h2 class="relative flex items-center gap-2 text-2xl font-bold">
		<span class="iconify relative size-7 hugeicons--database"></span>
		<span class="absolute top-[45%] h-0.5 w-7 rotate-45 rounded-sm bg-white"></span>
		No Dataset
	</h2>
	<p>
		You didn't give this agent a dataset to answer based on yet. Create a new dataset for it or
		associate an existing one with it.
	</p>
	<div class="flex gap-2">
		<button
			use:popup={datasetsPopup}
			class="variant-filled-primary btn-sm flex items-center gap-1 rounded-md font-semibold"
		>
			{#if $isAssociating}
				Associating...
				<LoadingSpinner />
			{:else}
				Associate Dataset
				<span class="iconify size-5 hugeicons--database-sync-01"></span>
			{/if}
		</button>
	</div>
</div>

<div data-popup="datasets-list" class="z-50">
	<DatasetSelectList {isAssociating} />
</div>
