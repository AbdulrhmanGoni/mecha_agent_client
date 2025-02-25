<script lang="ts">
	import AgentCard from '$lib/components/agents/AgentCard.svelte';
	import { agentsState } from '../../../stores/agents.svelte';
</script>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
	{#each agentsState.agents as agent}
		<AgentCard {agent} />
	{/each}
</div>
