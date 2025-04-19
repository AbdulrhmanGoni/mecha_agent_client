<script lang="ts">
	import Button from '../shared/Button.svelte';
	import downloadDatasetRequest from '$lib/functions/downloadDatasetRequest';

	const { datasetId }: { datasetId: string } = $props();

	function download() {
		console.log('download');
		downloadDatasetRequest(datasetId);
	}
</script>

<Button size="sm" class="variant-outline-primary" onclick={download}>
	<span class="iconify size-5 hugeicons--download-04"></span>
	download
</Button>
