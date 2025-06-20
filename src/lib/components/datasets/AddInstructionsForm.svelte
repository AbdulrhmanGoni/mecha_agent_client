<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import InstructionsForm from './InstructionsForm.svelte';
	import { datasetPageState } from '../../../stores/datasetPage.svelte';

	const toast = getToastStore();
</script>

<InstructionsForm
	formTitle="Add Instructions"
	formTitleIcon="hugeicons--task-add-01"
	formDescription="After you add this instruction, The agents may take time to see the updates and respond based on"
	path="/"
	method="POST"
	submitButtonText="Add"
	submitButtonIcon="hugeicons--add-circle"
	successStatusCode={201}
	resetFormAfterSubmit
	onSuccess={(res) => {
		datasetPageState.dataset!.instructionsCount++;
		toast.trigger({
			message: res as string,
			background: 'variant-filled-success'
		});
	}}
/>
