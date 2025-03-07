<script lang="ts">
	import createApiKeyRequest from '$lib/functions/createApiKeyRequest';
	import Icon from '@iconify/svelte';
	import {
		apiKeysState,
		createApiKeysState,
		apiKeymaxAgeOptions
	} from '../../../stores/apiKeys.svelte';
	import Button from '../shared/Button.svelte';
	import { permissions } from '$lib/constants/auth';

	let KEY_NAME_MIN_LENGTH = 3;
	let keyNameError = '';
	let permissionsError = '';

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
			createApiKeysState.isLoading = true;
			await createApiKeyRequest({
				keyName,
				permissions: selectedPermissions,
				maxAgeInDays: Number(formData.get('maxAge')?.toString() || 0)
			})
				.then((newKey) => {
					formElement.reset();
					apiKeysState.apiKeys.push(newKey);
				})
				.catch((error) => {
					createApiKeysState.error = error.message;
				})
				.finally(() => {
					createApiKeysState.isLoading = false;
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
					disabled={createApiKeysState.isLoading}
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
					disabled={createApiKeysState.isLoading}
					class="select variant-form-material"
					name="maxAge"
					placeholder="Key Name"
				>
					{#each apiKeymaxAgeOptions as option}
						<option value={option}>{option} days</option>
					{/each}
				</select>
			</label>
		</div>
		<div class="space-y-2">
			<span>Key's Permissions</span>
			<div class="space-y-2">
				{#each permissions as permission}
					<label class="flex w-fit items-center space-x-2">
						<input
							disabled={createApiKeysState.isLoading}
							name={permission}
							class="checkbox"
							type="checkbox"
						/>
						<p>{permission}</p>
					</label>
				{/each}
			</div>
			{#if permissionsError}
				<span class="text-error-600">{permissionsError}</span>
			{/if}
		</div>
		<Button size="sm" class="variant-filled-primary" type="submit">
			{#if createApiKeysState.isLoading}
				<Icon icon="svg-spinners:6-dots-rotate" width="21" height="21" />
			{:else}
				<Icon icon="material-symbols:add" width="21" height="21" />
			{/if}
			Create
		</Button>
	</form>
</div>
