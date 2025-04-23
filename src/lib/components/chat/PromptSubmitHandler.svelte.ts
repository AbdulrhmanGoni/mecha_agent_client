import promptRequest from '$lib/functions/promptRequest';
import { type ToastStore } from '@skeletonlabs/skeleton';
import { chatsHistoryState, openedChatState } from '../../../stores/chatStore.svelte';
import { goto } from '$app/navigation';

export default function PromptSubmitHandler({ agent, chatId, toastStore }: { agent: Agent; chatId: string, toastStore: ToastStore }) {
	return () => {
		if (openedChatState.currentPrompt) {
			openedChatState.chatFeed.push(
				{
					content: openedChatState.currentPrompt,
					role: 'user'
				},
				{
					content: '',
					role: 'agent'
				}
			);

			const responsePart = openedChatState.chatFeed[openedChatState.chatFeed.length - 1];

			function generateResponse() {
				if (responsePart.content) responsePart.content = '';
				openedChatState.isGenerating = true;
				responsePart.isGenerating = true;
				openedChatState.error = '';
				responsePart.error = "";

				promptRequest({
					prompt: openedChatState.currentPrompt,
					agent,
					chatId,
					onData(data) {
						responsePart.content += data;
					},
					onEnd(newChatId) {
						if (newChatId) {
							chatsHistoryState.chatsHistory.push({
								startedAt: new Date().toISOString(),
								agentId: agent.id,
								title: openedChatState.currentPrompt.slice(0, 40),
								id: newChatId,
								messages: []
							});
							goto(`/agents/${agent.id}/chat/${newChatId}`, { state: { isNewChat: true } });
						}
						openedChatState.isGenerating = false;
						responsePart.isGenerating = false;
						openedChatState.currentPrompt = '';
					},
					onError(message) {
						openedChatState.isGenerating = false;
						responsePart.isGenerating = false;
						responsePart.error = message;
					}
				});
			}

			generateResponse();

			openedChatState.reGenerate = generateResponse;
		} else {
			toastStore.trigger({
				message: 'Write your prompt first please',
				background: 'variant-filled-error'
			});
		}
	}
}