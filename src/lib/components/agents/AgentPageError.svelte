<script lang="ts">
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import ErrorPage from '../shared/ErrorPage.svelte';

	const { errorMessage }: { errorMessage: string } = $props();
</script>

<ErrorPage
	title="Failed to fetch the Agent"
	{errorMessage}
	iconName="emojione:sad-but-relieved-face"
	retryFn={agentPageState.refetchAgent}
/>
