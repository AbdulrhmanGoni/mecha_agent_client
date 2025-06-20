<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import { datasetInstructionsState, datasetPageState } from '../../../stores/datasetPage.svelte';

	const { instruction }: { instruction: Instruction } = $props();

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	let isDeleting: boolean = $state(false);

	function deleteHandler(e: ButtonEvent) {
		e.stopPropagation();
		e.preventDefault();
		modalStore.trigger({
			type: 'confirm',
			title: 'Delete Instruction',
			body: `
				Are you sure you want to delete this Instruction? <br />
				Note that you cannot undone this action after confirming it.
			`,
			response(confirmed) {
				if (confirmed) {
					isDeleting = true;
					clientFetchAPI<string>({
						path: '/api/instructions',
						method: 'DELETE',
						body: [instruction.id]
					})
						.then((res) => {
							datasetInstructionsState.instructions = datasetInstructionsState.instructions.filter(
								(instruction) => instruction.id !== datasetInstructionsState.selectedInstruction!.id
							);
							datasetInstructionsState.selectedInstruction = null;
							datasetPageState.dataset!.instructionsCount--;

							toastStore.trigger({
								message: res,
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
						});
				}
			}
		});
	}
</script>

<button
	aria-label="Delete the instruction"
	class="variant-filled-error flex h-fit items-center rounded-md p-1 sm:p-1.5"
	onclick={deleteHandler}
>
	{#if isDeleting}
		<LoadingSpinner className="size-5" />
	{:else}
		<span class="iconify size-5 hugeicons--delete-02"></span>
	{/if}
</button>
