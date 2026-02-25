<script lang="ts">
	import Button from '../shared/Button.svelte';
	import CopyApiKeyButton from './CopyApiKeyButton.svelte';

	const { apiKey }: { apiKey: string } = $props();

	function onClose() {
		const escEvent = new KeyboardEvent('keydown', {
			key: 'Escape',
			code: 'Escape',
			bubbles: true
		});

		document.dispatchEvent(escEvent);
	}
</script>

<div
	class="bg-surface-100-800-token w-modal modal block h-auto space-y-4 overflow-y-auto p-4 shadow-xl rounded-container-token"
>
	<h2 class="h3 font-semibold">API Key Created Successfully</h2>
	<div class="space-y-2.5">
		<p>Here is the API Key you just created:</p>
		<code
			class="flex items-center gap-2 overflow-auto text-ellipsis text-nowrap rounded-lg bg-gray-200 p-2 dark:bg-gray-800"
		>
			<CopyApiKeyButton {apiKey} />
			{apiKey}
		</code>
		<p class="flex gap-2 text-warning-700 dark:text-warning-400">
			<i class="iconify h-6 w-8 hugeicons--alert-01"></i>
			Make sure to copy it and save it somewhere safe because you will not be able to see it again after
			closing this window
		</p>
		<Button class="variant-filled-surface float-end" onclick={onClose}>Close</Button>
	</div>
</div>
