<script lang="ts">
	import { goto } from '$app/navigation';
	import AgentForm from '$lib/components/agents/AgentForm.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { agentsState } from '../../../stores/agents.svelte';
	import LoadingOverlay from '$lib/components/shared/LoadingOverlay.svelte';
	import { userDataState } from '../../../stores/userData.svelte';

	let loading = $state(false);

	const toastStore = getToastStore();
</script>

<AgentForm
	formTitle="Create Agent"
	submitButtonText="Create"
	submitButtonIconName="hugeicons--add-square"
	onBeforeSubmit={() => (loading = true)}
	onFormSubmit={(form) => {
		const newAgentData = {};
		const formData = new FormData(form);
		for (const [key, value] of formData.entries()) {
			value && Object.assign(newAgentData, { [key]: value });
		}

		clientFetchAPI<string>({
			path: '/api/agents',
			body: newAgentData,
			method: 'POST',
			successStatusCode: 201
		})
			.then(async (res) => {
				userDataState.user!.agentsCount++;
				if (agentsState.isFetched) {
					agentsState.isFetched = false;
					agentsState.refetchAgents();
				}
				toastStore.trigger({
					message: res,
					background: 'variant-filled-success'
				});
				goto('/agents');
			})
			.catch((error) => {
				toastStore.trigger({
					message: error,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				loading = false;
			});
	}}
/>
<LoadingOverlay open={loading} />
