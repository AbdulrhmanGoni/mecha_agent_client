<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { chatsHistoryState, fetchAgentChats } from '../../../stores/chatStore.svelte';
	import Button from '../shared/Button.svelte';
	import { goto } from '$app/navigation';
	import ChatHistoryLoading from './ChatHistoryLoading.svelte';
	import Alert from '../shared/Alert.svelte';
	import ChatHistoryItem from './ChatHistoryItem.svelte';

	onMount(() => {
		fetchAgentChats($page.params.agentId);
	});

	const { closeDrawer }: { closeDrawer: () => void } = $props();
</script>

<div class="flex h-full min-w-52 flex-col gap-3 p-3">
	<h4 class="h4 flex items-center gap-2 font-bold">
		<span class="iconify size-6 hugeicons--date-time"></span>
		Chats Histories
	</h4>
	<ul class="list flex-1 space-y-1.5 overflow-auto">
		{#if chatsHistoryState.isFetching}
			<ChatHistoryLoading />
		{:else if chatsHistoryState.error}
			<Alert title="Error" message={chatsHistoryState.error} variant="error" />
		{:else if chatsHistoryState.isFetched}
			{#if chatsHistoryState.chatsHistory.length}
				{#each chatsHistoryState.chatsHistory as chatHistory}
					<ChatHistoryItem {chatHistory} {closeDrawer} />
				{/each}
			{:else}
				<p>No chats history</p>
			{/if}
		{/if}
	</ul>
	<Button
		class="variant-filled-secondary gap-2"
		onclick={() => {
			goto(`/agents/${$page.params.agentId}/chat/new`, { state: { isNewChat: true } });
			closeDrawer();
		}}
	>
		<span class="iconify size-6 hugeicons--bubble-chat-add"></span>
		New Chat
	</Button>
</div>
