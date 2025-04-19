<script lang="ts">
	import Button from '../shared/Button.svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import deleteDatasetRequest from '$lib/functions/deleteDatasetRequest';
	import { agentsState } from '../../../stores/agents.svelte';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	const modalStore = getModalStore();

	const { agent }: { agent: Agent } = $props();

	let isLoading: boolean = $state(false);

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
				if (confirmation && agent.dataset?.id) {
					isLoading = true;
					deleteDatasetRequest(agent.id, agent.dataset?.id)
						.then(() => {
							toast.trigger({
								message: 'The dataset was deleted successfully',
								background: 'variant-filled-success'
							});

							agentPageState.agent!.dataset = undefined;
							agentsState.agents.map((agent) => {
								if (agent.id === agentPageState.agent?.id) {
									agent.dataset = undefined;
								}
								return agent;
							});
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

<Button disabled={isLoading} onclick={deletionHandler} size="sm" class="variant-outline-error">
	{#if isLoading}
		<LoadingSpinner />
	{:else}
		<span class="iconify size-[19px] hugeicons--delete-02"></span>
	{/if}
	delete
</Button>
