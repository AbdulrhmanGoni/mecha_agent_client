<script lang="ts">
	import { page } from '$app/stores';
	import { FileDropzone, getToastStore } from '@skeletonlabs/skeleton';
	import Button from '../shared/Button.svelte';
	import Icon from '@iconify/svelte';
	import createDatasetRequest from '$lib/functions/createDatasetRequest';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import BackButton from '../shared/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { agentsState } from '../../../stores/agents.svelte';

	const supportedFilesTypes = ['application/jsonl', 'text/csv'];

	let datasetFile: File | undefined = $state(undefined);
	let fileInput: FileList | undefined = $state(undefined);

	function onChangeHandler(): void {
		let file = fileInput?.item(0);

		if (file?.name.endsWith('.jsonl')) {
			file = new File([file], file.name, { type: 'application/jsonl' });
		}

		if (file && file.size && file.name && supportedFilesTypes.includes(file.type)) {
			datasetFile = file;
		} else {
			datasetFile = undefined;
			fileInput = undefined;
		}
	}

	const createDatasetState: { loading: boolean } = $state({
		loading: false
	});

	const toast = getToastStore();

	function onFormSubmit(e: SubmitFormEvent): void {
		e.preventDefault();
		if (!datasetFile) {
			toast.trigger({
				message: 'Please attach the dataset file',
				background: 'variant-filled-warning'
			});
			return;
		}

		const formElement = e.currentTarget;
		const formData = new FormData(formElement);

		formData.set('datasetFile', datasetFile);

		createDatasetState.loading = true;
		createDatasetRequest(formData)
			.then((res) => {
				agentPageState.agent!.dataset = res;
				agentsState.agents.map((agent) => {
					if (agent.id === agentPageState.agent?.id) {
						agent.dataset = res;
					}
					return agent;
				});

				toast.trigger({
					message: 'The dataset was uploaded successfully and will be process',
					background: 'variant-filled-success',
					timeout: 10000
				});

				goto(`/agents/${$page.params.agentId}`, { replaceState: true });
			})
			.catch((err) => {
				toast.trigger({
					message: err,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				createDatasetState.loading = false;
			});
	}
</script>

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
			placeholder="Type the title here..."
			required
			minlength="3"
			maxlength="80"
		/>
	</label>
	<label class="label">
		<span>The description of the dataset</span>
		<textarea
			class="input variant-form-material"
			name="description"
			rows="3"
			placeholder="Type the description here..."
			maxlength="200"
		></textarea>
	</label>
	<input required name="agentId" value={$page.params.agentId} hidden />
	<FileDropzone
		on:change={onChangeHandler}
		name="datasetFile"
		bind:files={fileInput}
		slotLead="mb-2"
		slotMeta="flex items-center justify-center gap-1"
	>
		<svelte:fragment slot="lead">
			<div class="flex flex-col items-center gap-1">
				<Icon icon="material-symbols:upload-file-outline-rounded" width="54" height="54" />
				<p class="text-lg font-bold">Dataset File</p>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="message">
			{#if fileInput}
				{fileInput.item(0)?.name}
			{:else}
				Upload the file containing the dataset of the agent
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="meta">
			JSONL and CSV Allowed
			{#if fileInput}
				<Icon
					class="text-success-700"
					icon="line-md:circle-twotone-to-confirm-circle-transition"
					width="17"
					height="17"
				/>
			{:else}
				<Icon class="text-warning-700" icon="line-md:alert-circle" width="17" height="17" />
			{/if}
		</svelte:fragment>
	</FileDropzone>
	<div class="flex justify-center gap-2">
		<BackButton class="variant-filled-error" target="/agents/{$page.params.agentId}" />
		<Button class="variant-filled-primary" type="submit">
			<Icon icon="iconamoon:file-add-light" width="22" height="22" />
			Create
		</Button>
	</div>
</form>
{#if createDatasetState.loading}
	<dialog
		class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/15"
	>
		<Icon color="white" icon="eos-icons:loading" width="55" height="55" />
	</dialog>
{/if}
