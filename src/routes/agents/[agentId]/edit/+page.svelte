<script lang="ts">
	import { page } from '$app/stores';
	import AgentForm from '$lib/components/agents/AgentForm.svelte';
	import AgentFormLoading from '$lib/components/agents/AgentFormLoading.svelte';
	import { fetchAgentState, agentPageState } from '../../../../stores/agentPage.svelte';
	import checkAgentFormChanges from '$lib/functions/checkAgentFormChanges';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { goto } from '$app/navigation';
	import AgentPageError from '$lib/components/agents/AgentPageError.svelte';

	fetchAgentState($page.params.agentId);

	let isLoading = $state(false);

	const toast = getToastStore();

	function onFormSubmit(e: SubmitFormEvent) {
		e.preventDefault();
		if (agentPageState.agent) {
			const { isUpdated, updatedData } = checkAgentFormChanges(
				agentPageState.agent,
				e.currentTarget
			);

			if (isUpdated) {
				isLoading = true;
				clientFetchAPI({
					path: '/api/agents/' + $page.params.agentId,
					method: 'PATCH',
					body: updatedData
				})
					.then(() => {
						toast.trigger({
							message: 'The Agent was updated successfully',
							background: 'variant-filled-success'
						});
						agentPageState.refetchAgent();
						goto('/agents/' + $page.params.agentId);
					})
					.catch(() => {
						toast.trigger({
							message: 'An error occurred while updating the agent',
							background: 'variant-filled-error'
						});
					})
					.finally(() => {
						isLoading = false;
					});
			} else {
				toast.trigger({
					message: 'There are no changes on the agent',
					background: 'variant-filled-warning'
				});
			}
		}
	}
</script>

{#if agentPageState.isFetching}
	<AgentFormLoading />
{:else if agentPageState.error}
	<AgentPageError errorMessage={agentPageState.error} />
{:else if agentPageState.agent}
	<AgentForm
		formTitle="Edit Agent"
		submitButtonText="Confirm"
		submitButtonIconName="material-symbols:fact-check-outline-rounded"
		{onFormSubmit}
		{isLoading}
		defaults={{
			agentName: agentPageState.agent?.agentName,
			description: agentPageState.agent?.description,
			avatar: agentPageState.agent?.avatar,
			systemInstructions: agentPageState.agent?.systemInstructions,
			dontKnowResponse: agentPageState.agent?.dontKnowResponse,
			greetingMessage: agentPageState.agent?.greetingMessage,
			responseSyntax: agentPageState.agent?.responseSyntax
		}}
	/>
{/if}
