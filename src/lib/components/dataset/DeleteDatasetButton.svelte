<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { agentsState } from '../../../stores/agents.svelte';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';

	const modalStore = getModalStore();

	const { id }: { id: string } = $props();

	let isLoading = $state(false);

	const toast = getToastStore();

	function deletionHandler() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Dataset Deletion',
			body: `
				Are you sure you want to delete the dataset of this Agent? <br />
				The Agent won't be able to answer question based on this dataset anymore
			`,
			response(confirmation) {
				if (confirmation) {
					isLoading = true;
					clientFetchAPI<string>({ path: `/api/datasets/${id}`, method: 'DELETE' })
						.then((res) => {
							toast.trigger({
								message: res,
								background: 'variant-filled-success'
							});

							if (agentPageState.agent) {
								agentPageState.agent.datasetId = null;
							}

							agentsState.agents.map((agent) => {
								if (agent.id === agentPageState.agent?.id) {
									agent.datasetId = null;
								}
								return agent;
							});

							goto('/datasets', { replaceState: true });
						})
						.catch((error) => {
							toast.trigger({
								message: error,
								background: 'variant-filled-error'
							});
						})
						.finally(() => {
							isLoading = false;
						});
				}
			}
		});
	}
</script>

<button
	class="variant-filled-error flex h-fit items-center rounded-md p-1 sm:p-1.5"
	aria-label="Delete the dataset"
	onclick={deletionHandler}
	disabled={isLoading}
>
	{#if isLoading}
		<LoadingSpinner className="size-5" />
	{:else}
		<span class="iconify size-5 hugeicons--delete-02"></span>
	{/if}
</button>
