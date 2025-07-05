<script lang="ts">
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { datasetInstructionsState } from '../../../stores/datasetPage.svelte';
	import Button from '../shared/Button.svelte';
	import { page } from '$app/stores';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';

	const props: DatasetInstructionsFormProps = $props();

	const toast = getToastStore();

	let loading = $state(false);

	function submitHandler(e: SubmitFormEvent) {
		e.preventDefault();

		const formElement = e.currentTarget;
		const formData = new FormData(formElement);

		loading = true;
		clientFetchAPI<Dataset>({
			path: '/api/instructions?datasetId=' + $page.params.datasetId,
			method: props.method,
			body: props.mutateForm ? props.mutateForm(formData) : formData,
			successStatusCode: props.successStatusCode
		})
			.then((res) => {
				props.onSuccess?.(res, formData);
			})
			.catch((err) => {
				props.onError?.(err);
				toast.trigger({
					message: err,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				if (props.resetFormAfterSubmit) {
					formElement.reset();
				}
				props.onFinally?.();
				loading = false;
			});
	}
</script>

<form onsubmit={submitHandler} class="card mt-2 space-y-3 rounded-md p-3">
	{#if props.formTitle}
		<h1 class="flex items-center gap-2 py-3 text-xl font-bold">
			{#if props.formTitleIcon}
				<span class="iconify size-7 {props.formTitleIcon}"></span>
			{/if}
			{props.formTitle}
		</h1>
	{/if}
	<div class="flex flex-col gap-3">
		<label class="label">
			<div class="flex items-center gap-1.5 font-bold">
				<span class="iconify size-4 hugeicons--bubble-chat-question sm:size-5"></span>
				<span>Prompt</span>
			</div>
			<textarea
				class="input variant-form-material h-full max-h-40 min-h-20"
				name="prompt"
				value={props.defaultValues?.prompt}
				required
				disabled={loading}
				placeholder="Write a prompt here..."
				maxlength="5000"
			></textarea>
		</label>
		<label class="label">
			<div class="flex items-center gap-1.5 font-bold">
				<span class="iconify size-4 hugeicons--message-01 sm:size-5"></span>
				<span>Response</span>
			</div>
			<textarea
				class="input variant-form-material h-full max-h-96 min-h-44"
				name="response"
				value={props.defaultValues?.response}
				required
				disabled={loading}
				placeholder="Write the proper response of the above question here..."
				maxlength="5000"
			></textarea>
		</label>
		<div class="flex gap-2 self-end">
			<Button
				size="sm"
				class="variant-ringed-error"
				type="button"
				onclick={() => {
					datasetInstructionsState.openAddInstructionsForm = false;
					datasetInstructionsState.openEditInstructionsForm = false;
				}}
				disabled={loading}
			>
				Close
			</Button>
			<Button class="variant-filled-primary" size="sm" type="submit" disabled={loading}>
				{#if loading}
					<LoadingSpinner />
				{:else}
					{props.submitButtonText}
				{/if}
			</Button>
		</div>
	</div>
</form>
