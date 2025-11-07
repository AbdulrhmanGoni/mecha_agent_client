<script lang="ts">
	import { page } from '$app/state';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import Button from '../shared/Button.svelte';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import { agentsState } from '../../../stores/agents.svelte';

	const { datasetId }: { datasetId: string } = $props();

	const toast = getToastStore();
	const modalStore = getModalStore();

	let isUnassociating = $state(false);

	function unassociate() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Unassociate Dataset',
			body: "Note that after unassociating the dataset with the agent, The agent won't be able to answer question based on this dataset",
			response(r) {
				if (r && !isUnassociating) {
					isUnassociating = true;
					clientFetchAPI<string>({
						path: `/api/agents/${page.params.agentId}/dataset?action=unassociate&datasetId=${datasetId}`,
						method: 'PATCH'
					})
						.then((res) => {
							if (agentPageState.agent) {
								agentPageState.agent.datasetId = null;
							}

							if (agentsState.agents.length) {
								agentsState.agents = agentsState.agents.map((agent) => {
									if (agent.id === page.params.agentId) {
										agent.datasetId = null;
									}
									return agent;
								});
							}

							toast.trigger({
								message: res,
								background: 'variant-filled-success'
							});
						})
						.catch((error) => {
							toast.trigger({
								message: error,
								background: 'variant-filled-error'
							});
						})
						.finally(() => {
							isUnassociating = false;
						});
				}
			}
		});
	}
</script>

<Button
	size="sm"
	disabled={isUnassociating}
	class="variant-filled-warning gap-2"
	onclick={unassociate}
>
	Unassociate
	<span class="iconify size-4 hugeicons--unlink-03"></span>
</Button>
