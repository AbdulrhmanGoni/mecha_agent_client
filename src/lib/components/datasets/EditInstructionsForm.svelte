<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { datasetInstructionsState } from '../../../stores/datasetPage.svelte';
	import InstructionsForm from './InstructionsForm.svelte';

	const toast = getToastStore();
</script>

{#if datasetInstructionsState.selectedInstruction}
	<InstructionsForm
		formTitle="Edit Instruction"
		formTitleIcon="hugeicons--task-edit-01"
		formDescription="After you edit this instruction, The agents may take time to see the updates and respond based on"
		path="/"
		method="PATCH"
		defaultValues={{
			prompt: datasetInstructionsState.selectedInstruction.prompt,
			response: datasetInstructionsState.selectedInstruction.response
		}}
		mutateForm={(form) => {
			form.set('id', datasetInstructionsState.selectedInstruction!.id);
			return form;
		}}
		submitButtonText="Save"
		submitButtonIcon="hugeicons--edit-01"
		onSuccess={(res, formData) => {
			if (datasetInstructionsState.selectedInstruction) {
				const updatedData = {
					prompt: formData.get('prompt')!.toString(),
					response: formData.get('response')!.toString(),
					updatedAt: new Date().getTime()
				};
				datasetInstructionsState.selectedInstruction! = {
					...datasetInstructionsState.selectedInstruction,
					...updatedData
				};

				datasetInstructionsState.instructions = datasetInstructionsState.instructions.map(
					(instruction) => {
						if (instruction.id === datasetInstructionsState.selectedInstruction!.id) {
							instruction = {
								...instruction,
								...updatedData
							};
						}

						return instruction;
					}
				);
			}
			toast.trigger({
				message: res as string,
				background: 'variant-filled-success'
			});
		}}
	/>
{/if}
