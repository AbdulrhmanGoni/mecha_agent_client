<script lang="ts">
	import createApiKeyRequest from '$lib/functions/createApiKeyRequest';
	import { apiKeysState, apiKeymaxAgeOptions } from '../../../stores/apiKeys.svelte';
	import Button from '../shared/Button.svelte';
	import { permissions } from '$lib/constants/auth';
	import { getToastStore, getModalStore } from '@skeletonlabs/skeleton';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import { userDataState } from '../../../stores/userData.svelte';
	import CopyApiKeyModal from './CopyApiKeyModal.svelte';

	let isLoading = $state(false);
	let KEY_NAME_MIN_LENGTH = 3;
	let keyNameError = $state('');
	let permissionsError = $state('');

	const toast = getToastStore();
	const modalStore = getModalStore();

	async function createApiKeyHandler(event: SubmitFormEvent) {
		event.preventDefault();
		const formElement = event.currentTarget;
		const formData = new FormData(formElement);

		const keyName = formData.get('keyName')?.toString() || '';

		if (keyName.length < KEY_NAME_MIN_LENGTH) {
			keyNameError = `key name must consist of at least ${KEY_NAME_MIN_LENGTH} characters`;
		} else {
			keyNameError = '';
		}

		const selectedPermissions = permissions.filter(
			(permission) => formData.get(permission) === 'on'
		);

		if (selectedPermissions.length) {
			permissionsError = '';
		} else {
			permissionsError = `You have to select at least one permission`;
		}

		if (!keyNameError && !permissionsError) {
			isLoading = true;
			await createApiKeyRequest({
				keyName,
				permissions: selectedPermissions,
				maxAgeInDays: Number(formData.get('maxAge')) || undefined
			})
				.then((data) => {
					console.log(data);
					formElement.reset();
					apiKeysState.apiKeys.push(data.record);
					userDataState.user!.apiKeysCount++;

					modalStore.trigger({
						type: 'component',
						buttonTextCancel: 'Close',
						title: 'Created API Key',
						component: {
							ref: CopyApiKeyModal,
							props: { apiKey: data.key }
						}
					});
				})
				.catch((error) => {
					toast.trigger({
						message: error,
						background: 'variant-filled-error'
					});
				})
				.finally(() => {
					isLoading = false;
				});
		}
	}
</script>

<div>
	<h3 class="h3 mb-3 font-semibold">Create an API Key</h3>
	<form class="space-y-4" id="create-api-key-form-id" onsubmit={createApiKeyHandler}>
		<div class="grid gap-2 sm:grid-cols-3">
			<label class="label sm:col-span-2">
				<span>API Key Name</span>
				<input
					disabled={isLoading}
					type="text"
					name="keyName"
					placeholder="Key Name"
					class="input variant-form-material"
				/>
				{#if keyNameError}
					<span class="text-error-600">{keyNameError}</span>
				{/if}
			</label>
			<label class="label sm:col-span-1">
				<span>API Key Max Age</span>
				<select
					disabled={isLoading}
					class="select variant-form-material"
					name="maxAge"
					placeholder="Key Name"
				>
					{#each apiKeymaxAgeOptions as option}
						<option value={option}>
							{option ? `${option} days` : 'No Expiration'}
						</option>
					{/each}
				</select>
			</label>
		</div>
		<div class="space-y-2">
			<span>API Key Permissions</span>
			<div class="space-y-2">
				{#each permissions as permission}
					<label class="flex w-fit items-center space-x-2">
						<input disabled={isLoading} name={permission} class="checkbox" type="checkbox" />
						<p>{permission}</p>
					</label>
				{/each}
			</div>
			{#if permissionsError}
				<span class="text-error-600">{permissionsError}</span>
			{/if}
		</div>
		<Button size="sm" class="variant-filled-primary" type="submit">
			{#if isLoading}
				<LoadingSpinner sizeClass="size-5" />
			{:else}
				<span class="iconify size-[18px] hugeicons--add-square"></span>
			{/if}
			Create
		</Button>
	</form>
</div>
