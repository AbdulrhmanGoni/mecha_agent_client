<script lang="ts">
	import { page } from '$app/stores';
	import { agentPageState, fetchAgentState } from '../../../../stores/agentPage.svelte';
	import AgentPageError from '$lib/components/agents/AgentPageError.svelte';
	import CreateDatasetForm from '$lib/components/dataset/CreateDatasetForm.svelte';
	import CreateDatasetFormLoading from '$lib/components/dataset/CreateDatasetFormLoading.svelte';

	fetchAgentState($page.params.agentId);
</script>

{#if agentPageState.isFetching}
	<CreateDatasetFormLoading />
{:else if agentPageState.error}
	<AgentPageError errorMessage={agentPageState.error} />
{:else if agentPageState.agent}
	<div class="py-12">
		<h1 class="text-center text-2xl font-bold">
			Dataset for "<span class="text-primary-500">{agentPageState.agent.agentName}</span>" agent
		</h1>
		<p class="secondary-text-color mb-8 mt-2 text-center text-lg">
			This agent will answer to users questions based on the dataset that you are going to upload in
			the form below
		</p>
		<CreateDatasetForm />
	</div>
{/if}
