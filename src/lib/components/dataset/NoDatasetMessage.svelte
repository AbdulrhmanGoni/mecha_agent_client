<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/shared/Button.svelte';
	import Icon from '@iconify/svelte';

	function goToCreateDatasetPage() {
		goto(`/agents/${$page.params.agentId}/create-dataset`);
	}
</script>

<div class="py-5">
	<div class="flex flex-1 flex-col items-center justify-center gap-3 p-4">
		<Icon icon="pepicons-pop:file-off" width="50" height="50" />
		<h2 class="h2 font-bold">No Dataset</h2>
		<p class="text-center sm:text-lg">You didn't give this agent a dataset to answer based on</p>
		<div class="flex gap-2">
			<Button size="sm" onclick={goToCreateDatasetPage} class="variant-filled-primary">
				<Icon icon="iconamoon:file-add-light" width="22" height="22" />
				Create Dataset
			</Button>
		</div>
	</div>
</div>
