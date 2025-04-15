<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { openedChatState } from '../../../stores/chatStore.svelte';
	import PromptSubmitHandler from './PromptSubmitHandler.svelte';

	const { agent, chatId }: { agent: Agent; chatId: string } = $props();

	const toastStore = getToastStore();
	const handler = PromptSubmitHandler({ agent, chatId, toastStore });
</script>

<div
	class="input-group input-group-divider variant-form-material grid-cols-[1fr_auto] transition-all rounded-container-token"
>
	<textarea
		bind:value={openedChatState.currentPrompt}
		class="variant-form-material resize-none border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write Your prompt here..."
		rows="1"
		disabled={openedChatState.isGenerating || !!openedChatState.error}
	></textarea>
	<button onclick={handler} class="variant-filled-primary !text-white">Send</button>
</div>
