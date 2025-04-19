<script lang="ts">
	import DeleteDatasetButton from './DeleteDatasetButton.svelte';
	import DownloadDatasetButton from './DownloadDatasetButton.svelte';
	import NoDatasetMessage from './NoDatasetMessage.svelte';
	import DatasetStatus from './DatasetStatus.svelte';

	const { agent }: { agent: Agent } = $props();
</script>

{#if agent?.dataset}
	<div>
		<div class="mb-2 flex items-center gap-2">
			<span class="iconify size-7 hugeicons--file-02"></span>
			<h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{agent.dataset?.title}
			</h5>
		</div>
		<p class="mb-3">
			{agent.dataset?.description}
		</p>
		<div class="mb-3">
			<DatasetStatus {agent} />
		</div>
		<div class="flex gap-2">
			<DownloadDatasetButton datasetId={agent.dataset.id} />
			<DeleteDatasetButton {agent} />
		</div>
	</div>
{:else}
	<NoDatasetMessage />
{/if}
