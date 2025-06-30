<script lang="ts">
	import { datasetsState } from '../../../stores/datasets.svelte';
	import { userDataState } from '../../../stores/userData.svelte';
	import DatasetFormModalButton from './DatasetFormModalButton.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toast = getToastStore();
</script>

<DatasetFormModalButton
	class="variant-filled-primary btn-sm flex items-center gap-2 rounded-md sm:btn-md"
	aria-label="Create a dataset"
	formParams={{
		formTitle: 'Create a dataset',
		formTitleIcon: 'hugeicons--database-add',
		formDescription:
			'Create a dataset and fill it with instructions to link it later with your agents',
		path: '/',
		method: 'POST',
		successStatusCode: 201,
		onSuccess(res: Dataset) {
			toast.trigger({
				message: 'The dataset was created successfully',
				background: 'variant-filled-success'
			});
			datasetsState.datasets.push(res);
			userDataState.user!.datasetsCount++;
		},
		submitButtonText: 'Create',
		submitButtonIcon: 'hugeicons--add-circle'
	}}
>
	Create Dataset
	<span class="iconify size-4 hugeicons--database-add sm:size-5"></span>
</DatasetFormModalButton>
