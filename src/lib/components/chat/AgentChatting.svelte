<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
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
		if (chatId !== 'new' && !$page.state.isNewChat) {
			fetchChatMessages(agent.id, chatId);
		} else if (openedChatState.chatFeed.length) {
			resetOpenedChatState();
		}
	});
</script>

<div class="mb-4 flex gap-2 sm:mb-6">
	<BackButton size="sm" target="/agents/{agent.id}" />
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
				iconName="tabler:message-2-x"
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

			{#if !areThereFeed && !openedChatState.isFetching && !openedChatState.error}
				<h1 class="text-center text-4xl font-extrabold">
					{agent.greetingMessage || 'Hi, How can i help you?'}
				</h1>
			{/if}

			{#if !openedChatState.isFetching && !openedChatState.error}
				<PromptField {agent} {chatId} />
			{/if}
		{/if}
	</div>
</div>
