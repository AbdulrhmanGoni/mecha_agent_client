<script lang="ts">
	import { agentsState } from '../../../stores/agents.svelte';
	import Button from '../shared/Button.svelte';
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
	<span class="iconify size-[22px] hugeicons--chatting-01"></span>
</Button>
