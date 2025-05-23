<script lang="ts">
	import { clipboard, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const { agent }: { agent: Agent } = $props();

	const popupClick: PopupSettings = {
		event: 'hover',
		target: 'copy-agent-id',
		placement: 'top'
	};

	let isCopied = $state(false);

	function onCopy() {
		if (!isCopied) {
			isCopied = true;
			setTimeout(() => {
				isCopied = false;
			}, 5000);
		}
	}
</script>

<button
	class="flex h-fit rounded-md p-1 transition-colors hover:variant-soft-primary"
	use:popup={popupClick}
	use:clipboard={agent.id}
	onclick={onCopy}
	aria-label="Copy Copy agent's id"
>
	<span class="iconify size-5 hugeicons--copy-01 sm:size-6"></span>
</button>

<div class="card variant-filled-surface p-2 text-sm" data-popup="copy-agent-id">
	{#if isCopied}
		<p class="flex items-center gap-1 text-success-500">
			Copied
			<span class="iconify size-4 hugeicons--checkmark-circle-03"></span>
		</p>
	{:else}
		<p>Copy agent's id</p>
	{/if}
	<div class="variant-filled-surface arrow"></div>
</div>
