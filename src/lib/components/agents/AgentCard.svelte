<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import DeleteAgentButton from './DeleteAgentButton.svelte';
	import EditAgentButton from './EditAgentButton.svelte';
	import ChatWithAgentButton from '../chat/ChatWithAgentButton.svelte';
	import { goto } from '$app/navigation';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import AgentFallbackAvatar from './AgentFallbackAvatar.svelte';
	import mediaURL from '$lib/functions/mediaURL';

	const { agent }: { agent: Agent } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
	onclick={(e) => {
		e.stopPropagation();
		agentPageState.agent = agent;
		goto('/agents/' + agent.id);
	}}
	class="card card-hover flex w-full cursor-pointer flex-col overflow-hidden rounded-lg shadow-xl sm:mx-auto sm:max-w-lg"
>
	<div class="variant-gradient-secondary-tertiary h-32 w-full bg-gradient-to-br"></div>
	<div
		class="relative mx-auto -mt-16 size-24 overflow-hidden rounded-full border-4 border-solid border-white"
	>
		<Avatar width="w-full" src={mediaURL.agentsAvatars(agent.avatar)}>
			<AgentFallbackAvatar />
		</Avatar>
	</div>
	<div class="flex-1 p-3 text-center">
		<h2 class="line-clamp-2 font-bold">{agent.agentName}</h2>
		<p class="line-clamp-3">{agent.description}</p>
	</div>
	<hr class="!border-t-1 mx-3" />
	<div class="mx-3 flex items-center justify-center gap-2 py-3">
		<ChatWithAgentButton {agent} />
		<EditAgentButton {agent} />
		<DeleteAgentButton {agent} />
	</div>
</div>
