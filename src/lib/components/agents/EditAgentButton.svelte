<script lang="ts">
	import { agentsState } from '../../../stores/agents.svelte';
	import Button from '../shared/Button.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const { agent, classes }: { agent: Agent; classes?: string } = $props();
</script>

<Button
	disabled={agentsState.actionInProgress}
	size="sm"
	class={`variant-filled-secondary ${agentsState.actionInProgress ? 'cursor-not-allowed' : ''} ${classes}`}
	onclick={(e) => {
		e.stopPropagation();
		goto(`/agents/${agent.id}/edit`);
	}}
>
	<Icon icon="lucide:edit" width="22" height="22" />
</Button>
