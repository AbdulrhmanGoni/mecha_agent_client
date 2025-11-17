<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import TypingState from './TypingState.svelte';
	import { micromark } from 'micromark';
	import { openedChatState } from '../../../stores/chatStore.svelte';
	import AgentFallbackAvatar from '../agents/AgentFallbackAvatar.svelte';
	import Alert from '../shared/Alert.svelte';

	let { agentMessage, agent }: { agentMessage: ChatMessage; agent: Agent } = $props();
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar src={agent.avatar} width="w-12">
		<AgentFallbackAvatar />
	</Avatar>
	<div
		class="card {agentMessage.error
			? 'variant-soft-error'
			: 'variant-soft-primary'} space-y-2 rounded-tl-none p-4"
	>
		<header class="flex items-center">
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
</div>
