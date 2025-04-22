<script>
	import { goto } from '$app/navigation';
	import AgentForm from '$lib/components/agents/AgentForm.svelte';
	import LoadingSpinner from '$lib/components/dataset/LoadingSpinner.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { agentsState } from '../../../stores/agents.svelte';

	let loading = $state(false);

	const toastStore = getToastStore();
</script>

<AgentForm
	formTitle="Create Agent"
	submitButtonText="Create"
	submitButtonIconName="hugeicons--add-square"
	onFormSubmit={(e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		loading = true;
		clientFetchAPI({
			path: '/api/agents',
			body: formData,
			method: 'POST',
			successStatusCode: 201
		})
			.then(async (res) => {
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

{#if loading}
	<dialog
		class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/15"
	>
		<LoadingSpinner className="size-12 text-black dark:text-white" />
	</dialog>
{/if}
