<script lang="ts">
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import Button from '../shared/Button.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';

	const props: DatasetFormProps = $props();

	const modalStore = getModalStore();
	const toast = getToastStore();

	let loading = $state(false);

	function onFormSubmit(e: SubmitFormEvent): void {
		e.preventDefault();

		const formElement = e.currentTarget;
		const formData = new FormData(formElement);

		const data: Record<string, string> = {};
		formData.entries().forEach(([key, value]) => {
			data[key] = value.toString();
		});

		loading = true;
		clientFetchAPI<Dataset>({
			path: '/api/datasets' + props.path,
			method: props.method,
			body: data,
			successStatusCode: props.successStatusCode
		})
			.then((res) => {
				props.onSuccess?.(res, formData);
				modalStore.close();
			})
			.catch((err) => {
				props.onError?.(err);
				toast.trigger({
					message: err,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				props.onFinally?.();
				loading = false;
			});
	}
</script>

<div class="card flex w-full max-w-sm flex-col gap-4 p-4 sm:max-w-xl">
	<div>
		<div class="mb-2 flex">
			<h1 class="flex flex-1 items-center gap-2 text-2xl font-bold">
				<span class="iconify {props.formTitleIcon}"></span>
				{props.formTitle}
			</h1>
			<button
				class="flex h-fit p-0.5"
				type="button"
				onclick={() => modalStore.close()}
				aria-label="Close dataset form modal"
			>
				<span class="iconify hugeicons--cancel-02"></span>
			</button>
		</div>
		<p class="secondary-text-color">
			{props.formDescription}
		</p>
	</div>

	<form
		method="POST"
		enctype="multipart/form-data"
		class="flex flex-col gap-3"
		onsubmit={onFormSubmit}
	>
		<label class="label">
			<span>Dataset's title</span>
			<input
				class="input variant-form-material"
				name="title"
				type="text"
				value={props.defaultValues?.title}
				placeholder="Type the title here..."
				required
				disabled={loading}
				minlength="3"
				maxlength="80"
			/>
		</label>
		<label class="label">
			<span>The description of the dataset</span>
			<textarea
				class="input variant-form-material h-full max-h-40 min-h-20"
				name="description"
				value={props.defaultValues?.description}
				required
				disabled={loading}
				placeholder="Type the description here..."
				maxlength="200"
			></textarea>
		</label>
		<Button type="submit" size="sm" class="variant-filled-primary w-fit self-end">
			{props.submitButtonText}
			{#if loading}
				<LoadingSpinner sizeClass="size-4" />
			{:else}
				<span class="iconify size-4 {props.submitButtonIcon}"></span>
			{/if}
		</Button>
	</form>
</div>
