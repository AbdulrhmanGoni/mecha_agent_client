<script>
	import { agentsState } from '../../../stores/agents.svelte';
	import ErrorPage from '../shared/ErrorPage.svelte';

	const { errorMessage } = $props();
</script>

<ErrorPage
	title="Failed to fetch the Agents"
	errorMessage={errorMessage || 'Something wrong happened while fetching your Agents'}
	iconName="hugeicons--rss-error"
	retryFn={agentsState.refetchAgents}
/>
