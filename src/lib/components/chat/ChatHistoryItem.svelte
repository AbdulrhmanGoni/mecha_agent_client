<script lang="ts">
	import { page } from '$app/state';
	import timeAgo from '$lib/functions/timeAgo';
	import DeleteChatButton from './DeleteChatButton.svelte';

	type ChatHistoryItemProps = { chatHistory: ChatHistory; closeDrawer: () => void };

	const { chatHistory, closeDrawer }: ChatHistoryItemProps = $props();
</script>

<li
	class="{page.params.chatId === chatHistory.id
		? '!variant-filled-primary'
		: 'variant-soft-surface'} line-clamp-1 w-full rounded-md transition hover:variant-soft-primary"
>
	<a
		href="/agents/{page.params.agentId}/chat/{chatHistory.id}"
		onclick={(e) => {
			if (chatHistory.id === page.params.chatId) {
				e.preventDefault();
				return;
			}
			closeDrawer();
		}}
		class="w-full space-y-1 p-2"
	>
		<p class="font-semibold">{chatHistory.title}</p>
		<div class="flex w-full items-center justify-between gap-2 text-sm">
			<p>{timeAgo(new Date(chatHistory.startedAt))}</p>
			<DeleteChatButton {chatHistory} />
		</div>
	</a>
</li>
