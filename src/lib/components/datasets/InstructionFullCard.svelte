<script lang="ts">
	import timeAgo from '$lib/functions/timeAgo';
	import { datasetInstructionsState } from '../../../stores/datasetPage.svelte';
	import Divider from '../shared/Divider.svelte';
	import DeleteInstructionButton from './DeleteInstructionButton.svelte';
</script>

{#if datasetInstructionsState.selectedInstruction}
	<div class="card flex h-full flex-col gap-2 p-3">
		<div class="flex items-center gap-2">
			<button
				aria-label="Edit the instruction"
				class="variant-filled-secondary flex h-fit items-center rounded-md p-1 sm:p-1.5"
				onclick={() => {
					datasetInstructionsState.openEditInstructionsForm = true;
				}}
			>
				<span class="iconify size-5 hugeicons--message-edit-01"></span>
			</button>
			<DeleteInstructionButton instruction={datasetInstructionsState.selectedInstruction} />
			<button
				aria-label="Edit the instruction"
				class="ml-auto flex h-fit items-center rounded-md"
				onclick={() => {
					datasetInstructionsState.selectedInstruction = null;
				}}
			>
				<span class="iconify size-4 hugeicons--cancel-01"></span>
			</button>
		</div>

		<Divider />

		<div class="flex-1 space-y-3 overflow-auto">
			<div class="flex gap-1.5">
				<span class="iconify size-4 hugeicons--bubble-chat-question sm:size-5"></span>
				<p class="text-xs font-medium sm:text-sm">
					{datasetInstructionsState.selectedInstruction.prompt}
				</p>
			</div>
			<div class="flex flex-1 gap-1.5">
				<span class="iconify size-4 hugeicons--message-01 sm:size-5"></span>
				<p class="secondary-text-color text-xs sm:text-sm">
					{datasetInstructionsState.selectedInstruction.response}
				</p>
			</div>
		</div>

		<Divider />

		<div class="secondary-text-color flex flex-wrap gap-2 text-sm">
			<p>Created: {timeAgo(new Date(datasetInstructionsState.selectedInstruction.createdAt))}</p>
			-
			<p>Updated: {timeAgo(new Date(datasetInstructionsState.selectedInstruction.updatedAt))}</p>
		</div>
	</div>
{:else}
	<div class="card h-full">
		<p class="px-4 py-10 text-center">No selected instruction</p>
	</div>
{/if}
