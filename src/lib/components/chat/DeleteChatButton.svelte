<script lang="ts">
	import { page } from '$app/stores';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { chatsHistoryState, resetOpenedChatState } from '../../../stores/chatStore.svelte';
	import { goto } from '$app/navigation';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';

	const { chatHistory }: { chatHistory: ChatHistory } = $props();

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	let isDeleting: boolean = $state(false);

	function deleteHandler(e: ButtonEvent) {
		e.stopPropagation();
		e.preventDefault();
		modalStore.trigger({
			type: 'confirm',
			title: 'Delete Chat',
			body: `
				Are you sure you want to delete the chat? <br />
				Note that you cannot undone this action.
			`,
			response(confirmed) {
				if (confirmed) {
					isDeleting = true;
					chatsHistoryState.actionInProgress = true;
					clientFetchAPI({
						path: `/api/chats/${chatHistory.id}?agentId=${chatHistory.agentId}`,
						method: 'DELETE'
					})
						.then(() => {
							chatsHistoryState.chatsHistory = chatsHistoryState.chatsHistory.filter(
								(chat) => chat.id !== chatHistory.id
							);

							if ($page.params.chatId === chatHistory.id) {
								resetOpenedChatState();
								goto(`/agents/${chatHistory.agentId}/chat/new`, { replaceState: true });
							}

							toastStore.trigger({
								message: 'Chat deleted successfully',
								background: 'variant-filled-success'
							});
						})
						.catch((error) => {
							toastStore.trigger({
								message: error,
								background: 'variant-filled-error'
							});
						})
						.finally(() => {
							isDeleting = false;
							chatsHistoryState.actionInProgress = false;
						});
				}
			}
		});
	}
</script>

<button
	class={chatsHistoryState.actionInProgress ? 'cursor-not-allowed' : ''}
	disabled={isDeleting || chatsHistoryState.actionInProgress}
	onclick={deleteHandler}
>
	{#if isDeleting}
		<LoadingSpinner className="size-4" />
	{:else}
		<span class="iconify size-4 transition-colors hugeicons--delete-02 hover:text-red-500"></span>
	{/if}
</button>
