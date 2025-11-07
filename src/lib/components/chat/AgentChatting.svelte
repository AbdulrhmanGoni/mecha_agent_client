<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import {
		fetchChatMessages,
		openedChatState,
		resetChatsHistoryState,
		resetOpenedChatState
	} from '../../../stores/chatStore.svelte';
	import AgentResponse from './AgentResponse.svelte';
	import UserPrompt from './UserPrompt.svelte';
	import PromptField from './PromptField.svelte';
	import BackButton from '../shared/BackButton.svelte';
	import ChatsHistoryDrawer from './ChatsHistoryDrawer.svelte';
	import ChatMessagesLoading from './ChatMessagesLoading.svelte';
	import { onMount } from 'svelte';
	import ErrorPage from '../shared/ErrorPage.svelte';
	import Button from '../shared/Button.svelte';

	const { agent, user, chatId }: { agent: Agent; user: User; chatId: string } = $props();

	const areThereFeed = $derived(!!openedChatState.chatFeed.length);

	onMount(() => {
		if (chatId !== 'new') {
			fetchChatMessages(agent.id, chatId);
		}
	});

	beforeNavigate(({ to }) => {
		if (!to?.url.pathname.match('chat')) {
			resetOpenedChatState();
			resetChatsHistoryState();
		}
	});

	afterNavigate(() => {
		if (chatId === 'new') {
			resetOpenedChatState();
		} else if (!page.state.isNewChat) {
			fetchChatMessages(agent.id, chatId);
		}
	});
</script>

<div class="my-6 flex gap-2 sm:my-8">
	<BackButton size="sm" />
	<Button
		size="sm"
		class="variant-filled-secondary gap-2"
		onclick={() => {
			goto(`/agents/${page.params.agentId}/chat/new`, { state: { isNewChat: true } });
		}}
	>
		<span class="iconify size-5 hugeicons--bubble-chat-add"></span>
		New Chat
	</Button>
	<ChatsHistoryDrawer />
</div>
<div class="flex flex-1 gap-5">
	<div class="mb-8 flex w-full flex-1 flex-col items-center justify-center gap-5 sm:gap-8">
		{#if openedChatState.isFetching}
			<ChatMessagesLoading />
		{:else if openedChatState.error}
			<ErrorPage
				title="Failed to fetch chat messages"
				errorMessage={openedChatState.error}
				iconName="hugeicons--bubble-chat-cancel"
				retryFn={() => {
					chatId !== 'new' && fetchChatMessages(agent.id, chatId);
				}}
				hideBackButton
			/>
		{:else}
			<div class="flex w-full flex-col gap-2.5 transition-all {areThereFeed ? 'flex-1' : ''}">
				{#if areThereFeed}
					{#each openedChatState.chatFeed as message}
						{#if message.role === 'user'}
							<UserPrompt {user} userMessage={message} />
						{:else}
							<AgentResponse {agent} agentMessage={message} />
						{/if}
					{/each}
				{/if}
			</div>

			{#if !areThereFeed}
				<h1 class="text-center text-4xl font-extrabold">
					{agent.greetingMessage || 'Hi, How can i help you?'}
				</h1>
			{/if}

			<PromptField {agent} {chatId} />
		{/if}
	</div>
</div>
