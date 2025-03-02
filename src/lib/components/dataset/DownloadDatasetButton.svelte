<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '../shared/Button.svelte';
	import downloadDatasetRequest from '$lib/functions/downloadDatasetRequest';

	const { datasetId }: { datasetId: string } = $props();

	function download() {
		console.log('download');
		downloadDatasetRequest(datasetId);
	}
</script>

<Button size="sm" class="variant-outline-primary" onclick={download}>
	<Icon icon="uil:file-download" width="19" height="19" />
	download
</Button>
