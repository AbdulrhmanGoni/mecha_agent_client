<script lang="ts">
	import timeAgo from '$lib/functions/timeAgo';
	import { datasetInstructionsState } from '../../../stores/datasetPage.svelte';
	import Divider from '../shared/Divider.svelte';

	const { instruction }: { instruction: Instruction } = $props();

	const isSelected = $derived(datasetInstructionsState.selectedInstruction?.id === instruction.id);
	const highlightedClasses = '!bg-surface-200 dark:!bg-surface-700';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
	class="card flex cursor-pointer flex-col gap-2 {isSelected
		? highlightedClasses
		: ''} p-3 transition-colors hover:bg-surface-200 dark:hover:bg-surface-700"
	onclick={() => {
		if (!isSelected) {
			datasetInstructionsState.selectedInstruction = instruction;
		}
	}}
>
	<div class="flex gap-1.5">
		<span class="iconify size-4 hugeicons--bubble-chat-question sm:size-5"></span>
		<p class="line-clamp-2 text-xs font-medium sm:text-sm">
			{instruction.prompt}
		</p>
	</div>
	<div class="flex gap-1.5">
		<span class="iconify size-4 hugeicons--message-01 sm:size-5"></span>
		<p class="secondary-text-color line-clamp-3 text-xs sm:text-sm">
			{instruction.response}
		</p>
	</div>

	<Divider />

	<div class="secondary-text-color flex gap-2 text-xs sm:text-sm">
		<p>Created: {timeAgo(new Date(instruction.createdAt))}</p>
		-
		<p>Updated: {timeAgo(new Date(instruction.updatedAt))}</p>
	</div>
</div>
