<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import TypingState from './TypingState.svelte';
	import { micromark } from 'micromark';
	import { openedChatState } from '../../../stores/chatStore.svelte';
	import AgentFallbackAvatar from '../agents/AgentFallbackAvatar.svelte';
	import mediaURL from '$lib/functions/mediaURL';
	import Alert from '../shared/Alert.svelte';

	let { agentMessage, agent }: { agentMessage: ChatMessage; agent: Agent } = $props();
</script>

<div class="grid grid-cols-[1fr_auto] gap-2">
	<div
		class="card {agentMessage.error
			? 'variant-soft-error'
			: 'variant-soft-primary'} space-y-2 rounded-tr-none p-4"
	>
		<header class="flex items-center justify-between">
			<p class="font-bold">{agent?.agentName}</p>
		</header>
		<article
			class="prose max-w-full text-wrap dark:prose-invert prose-h1:text-xl prose-h1:font-bold prose-p:text-justify prose-img:rounded-xl"
		>
			{@html micromark(agentMessage.content)}
		</article>
		{#if agentMessage.isGenerating}
			<TypingState />
		{/if}
		{#if agentMessage.error}
			<br />
			<Alert
				variant="error"
				title="Response Error"
				actionIconName="hugeicons--undo"
				message={agentMessage.error || 'Error while generating the response'}
				actionFunction={openedChatState.reGenerate}
			/>
		{/if}
	</div>
	<Avatar src={mediaURL.agentsAvatars(agent.avatar)} width="w-12">
		<AgentFallbackAvatar />
	</Avatar>
</div>
