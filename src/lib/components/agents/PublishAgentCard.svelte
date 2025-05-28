<script lang="ts">
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Button from '../shared/Button.svelte';
	import LoadingSpinner from '../dataset/LoadingSpinner.svelte';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import { agentsState } from '../../../stores/agents.svelte';
	import PublishAgentState from './PublishAgentState.svelte';
	import { userDataState } from '../../../stores/userData.svelte';

	const toastStore = getToastStore();

	let isLoading = $state(false);

	async function publishingController(action: 'publish' | 'unpublish') {
		isLoading = true;
		clientFetchAPI<string>({
			path: `/api/agents/${agentPageState.agent?.id}/${action}`,
			method: 'POST'
		})
			.then((res) => {
				toastStore.trigger({
					message: res,
					background: 'variant-filled-success'
				});
				const isPublished = action === 'publish';

				userDataState.user!.publishedAgents += isPublished ? 1 : -1;
				agentPageState.agent!.isPublished = isPublished;
				if (agentsState.agents.length) {
					for (let i = 0; i < agentsState.agents.length; i++) {
						if (agentsState.agents[i].id === agentPageState.agent?.id) {
							agentsState.agents[i].isPublished = isPublished;
						}
					}
				}
			})
			.catch((error) => {
				toastStore.trigger({
					message: error,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<div>
	<div class="mb-2 flex items-center gap-2">
		<span class="iconify size-7 hugeicons--globe-02"></span>
		<h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Publish Agent
		</h5>
		{#if agentPageState.agent?.isPublished}
			<PublishAgentState />
		{/if}
	</div>
	<p class="mb-3">
		{#if agentPageState.agent?.isPublished}
			You have published this agent to the public, You can now integrate
			<a
				href="https://github.com/AbdulrhmanGoni/mecha-agent-inference-client"
				target="_blank"
				rel="noopener noreferrer"
				class="text-primary-500 hover:underline"
			>
				Mecha Agent Inference client
			</a>
			into your web apps so people can interact with the agent through it
		{:else}
			Publish this agent to the public so people can interact with it
		{/if}
	</p>
	{#if agentPageState.agent?.isPublished}
		<Button
			size="sm"
			disabled={isLoading}
			onclick={() => publishingController('unpublish')}
			class="variant-filled-warning my-3 gap-2 {isLoading ? 'cursor-progress' : ''}"
		>
			{#if isLoading}
				Unpublishing
				<LoadingSpinner />
			{:else}
				Unpublish
				<span class="iconify size-5 hugeicons--no-internet"></span>
			{/if}
		</Button>
	{:else}
		<Button
			size="sm"
			disabled={isLoading}
			onclick={() => publishingController('publish')}
			class="variant-filled-primary my-3 gap-2 {isLoading ? 'cursor-progress' : ''}"
		>
			{#if isLoading}
				Publishing
				<LoadingSpinner />
			{:else}
				Publish
				<span class="iconify size-5 hugeicons--global"></span>
			{/if}
		</Button>
	{/if}
</div>
