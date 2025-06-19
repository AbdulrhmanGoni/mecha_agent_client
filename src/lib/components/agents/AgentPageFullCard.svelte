<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import AgentFallbackAvatar from './AgentFallbackAvatar.svelte';
	import AgentFieldDetail from './AgentFieldDetail.svelte';
	import DeleteAgentButton from './DeleteAgentButton.svelte';
	import EditAgentButton from './EditAgentButton.svelte';
	import ChatWithAgentButton from '../chat/ChatWithAgentButton.svelte';
	import mediaURL from '$lib/functions/mediaURL';
	import { goto } from '$app/navigation';
	import AgentDatasetCard from '../datasets/AgentDatasetCard.svelte';
	import PublishAgentCard from './PublishAgentCard.svelte';
	import CopyAgentIdButton from './CopyAgentIdButton.svelte';

	const { agent }: { agent: Agent } = $props();
</script>

<div class="flex flex-1 flex-col">
	<div
		class="variant-gradient-secondary-tertiary relative h-40 w-full rounded-t-lg bg-gradient-to-br sm:h-64"
	></div>
	<div
		class="relative mx-auto -mt-20 size-36 rounded-full border-4 border-solid border-white sm:-mt-36 sm:size-60"
	>
		<Avatar width="w-full" src={mediaURL.agentsAvatars(agent.avatar)}>
			<AgentFallbackAvatar />
		</Avatar>
	</div>
	<div class="p-3 text-center">
		<div class="mx-auto flex w-fit gap-1.5">
			<CopyAgentIdButton {agent} />
			<h2 class="h2 line-clamp-2 font-bold">
				{agent.agentName}
			</h2>
		</div>
		<p class="secondary-text-color line-clamp-3 text-lg">{agent.description}</p>
	</div>
	<div class="mx-3 flex items-center justify-center gap-2 pb-3">
		<ChatWithAgentButton {agent} />
		<EditAgentButton {agent} />
		<DeleteAgentButton {agent} onSuccess={() => goto('/agents', { replaceState: true })} />
	</div>
	<hr class="!border-t-1 my-3" />
	<div class="my-3 grid gap-4 md:grid-cols-2">
		<AgentFieldDetail
			title="System Instructions"
			value={agent.systemInstructions}
			iconName="hugeicons--message-programming"
			description="Additional system instructions to customize the behavior of the agent"
			noValueMessage="No additional system instructions"
		/>
		<AgentFieldDetail
			title="Don't Know Response"
			value={agent.dontKnowResponse}
			iconName="hugeicons--message-question"
			description="What should the agent respond if it doesn't find a suitable response?"
			noValueMessage="No custom don't know response, The default will be used"
		/>
		<AgentFieldDetail
			title="Greeting Message"
			value={agent.greetingMessage}
			iconName="hugeicons--waving-hand-01"
			description="How does your agent greet users?"
			noValueMessage="No custom greeting message, The default will be used"
		/>
		<AgentFieldDetail
			title="Response Syntax"
			value={agent.responseSyntax}
			iconName="hugeicons--text-align-left"
			noValueMessage="No perfered response syntax, a normal text will be used"
			description="The syntax used to format the response of the agent"
			valueStyle={agent.responseSyntax ? 'variant-soft-primary w-fit rounded-md py-1.5 px-3' : ''}
		/>
	</div>
	<hr class="!border-t-1 my-3" />
	<div class="grid gap-4 sm:grid-cols-2">
		<AgentDatasetCard />
		<PublishAgentCard />
	</div>
</div>
