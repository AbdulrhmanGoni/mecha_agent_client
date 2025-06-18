<script>
	import { page } from '$app/stores';
	import { datasetPageState, fetchDataset } from '../../../stores/datasetPage.svelte';
	import Button from '../shared/Button.svelte';
</script>

<div class="flex w-full flex-col gap-3 px-3 py-4">
	<div class="flex items-center gap-2 text-xl sm:text-2xl">
		<span class="iconify hugeicons--alert-02"></span>
		<h1 class="flex-1">Failed to fetch the dataset</h1>
		<Button
			size="sm"
			class="variant-ghost-warning size-8"
			onclick={() => {
				fetchDataset($page.params.datasetId);
			}}
		>
			<span class="iconify size-5 hugeicons--refresh"></span>
		</Button>
	</div>
	<p class="text-muted-foreground">{datasetPageState.error}</p>
</div>
