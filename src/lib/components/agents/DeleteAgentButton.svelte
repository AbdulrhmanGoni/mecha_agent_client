<script lang="ts">
	import deleteAgentRequest from '$lib/functions/deleteAgentRequest';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { agentsState } from '../../../stores/agents.svelte';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import Button from '../shared/Button.svelte';
	import Icon from '@iconify/svelte';

	const { agent, onSuccess }: { agent: Agent; onSuccess?: () => void } = $props();

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	let isDeleting = $state(false);

	function deleteAgent(e: ButtonEvent) {
		e.stopPropagation();
		modalStore.trigger({
			type: 'confirm',
			title: 'Delete Agent',
			body: `
				Are you sure you want to delete the agent? <br />
				If you continued, You cannot undone this action!.
			`,
			response(confirmed) {
				if (confirmed) {
					isDeleting = true;
					agentsState.actionInProgress = true;
					deleteAgentRequest(agent.id)
						.then(() => {
							agentsState.agents = agentsState.agents.filter((a) => a.id !== agent.id);
							if (agentPageState.agent?.id === agent.id) {
								agentPageState.agent = undefined;
							}
							toastStore.trigger({
								message: 'The Agent was deleted successfully',
								background: 'variant-filled-success'
							});
							onSuccess?.();
						})
						.catch(() => {
							toastStore.trigger({
								message: 'The Agent has failed to be deleted',
								background: 'variant-filled-error'
							});
						})
						.finally(() => {
							isDeleting = false;
							agentsState.actionInProgress = false;
						});
				}
			}
		});
	}
</script>

<Button
	disabled={isDeleting || agentsState.actionInProgress}
	size="sm"
	class={`variant-filled-error ${isDeleting ? 'cursor-progress' : agentsState.actionInProgress ? 'cursor-not-allowed' : ''}`}
	onclick={deleteAgent}
>
	{#if isDeleting}
		<Icon icon="svg-spinners:6-dots-scale" width="22" height="22" />
	{:else}
		<span class="iconify size-[22px] hugeicons--delete-02"></span>
	{/if}
</Button>
