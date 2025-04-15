<script lang="ts">
	import { agentsState } from '../../../stores/agents.svelte';
	import Button from '../shared/Button.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const { agent }: { agent: Agent } = $props();
</script>

<Button
	disabled={agentsState.actionInProgress}
	size="sm"
	class={`variant-filled-primary ${agentsState.actionInProgress ? 'cursor-not-allowed' : ''}`}
	onclick={(e) => {
		e.stopPropagation();
		goto(`/agents/${agent.id}/chat/new`);
	}}
>
	<Icon icon="ri:chat-ai-line" width="22" height="22" />
</Button>
