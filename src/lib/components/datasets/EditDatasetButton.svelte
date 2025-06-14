<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import DatasetFormModalButton from './DatasetFormModalButton.svelte';
	import { datasetsState } from '../../../stores/datasets.svelte';

	const toast = getToastStore();

	const { dataset }: { dataset: Dataset } = $props();
</script>

<DatasetFormModalButton
	class="variant-filled-secondary flex h-fit items-center rounded-md p-1 sm:p-1.5"
	formParams={{
		formTitle: 'Edit the dataset',
		formTitleIcon: 'hugeicons--database-setting',
		formDescription:
			'Editing the title or the description of the dataset will not effect the agents that uses it',
		path: `/${dataset.id}`,
		method: 'PATCH',
		defaultValues: {
			title: dataset.title,
			description: dataset.description
		},
		onSuccess(res, formData) {
			const updatedData = {
				title: formData.get('title')?.toString() as string,
				description: formData.get('description')?.toString() as string,
				updatedAt: new Date().toISOString()
			};

			datasetsState.datasets.map((dataset) => {
				dataset = {
					...dataset,
					...updatedData
				};
				return dataset;
			});

			toast.trigger({
				message: res as string,
				background: 'variant-filled-success'
			});
		},
		submitButtonText: 'Save',
		submitButtonIcon: 'hugeicons--checkmark-square-03'
	}}
>
	<span class="iconify size-5 hugeicons--edit-02"></span>
</DatasetFormModalButton>
