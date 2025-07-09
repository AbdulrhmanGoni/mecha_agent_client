<script lang="ts">
	import Button from '../shared/Button.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import ShowAndHidePasswordButton from '../shared/ShowAndHidePasswordButton.svelte';

	type Props = {
		title?: string;
		onSubmit: (values: UserPasswordFormValues) => void;
		withCurrentPasswordField?: boolean;
		loading?: boolean;
		cancelButtonText?: string;
		onCancel?: () => void;
	};

	const {
		title,
		onSubmit,
		withCurrentPasswordField,
		loading,
		cancelButtonText,
		onCancel: onCancel
	}: Props = $props();

	function submitResetPasswordRequest(e: SubmitFormEvent) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const currentPassword = formData.get('current-password')?.toString() || '';
		const newPassword = formData.get('new-password')?.toString() || '';
		const confirmedPassword = formData.get('confirmed-password')?.toString() || '';

		onSubmit({
			currentPassword,
			newPassword,
			confirmedPassword
		});
	}

	let showPassword = $state(false);
	const inputsType = $derived(showPassword ? 'text' : 'password');
</script>

<form onsubmit={submitResetPasswordRequest} class="w-full space-y-4 text-start">
	<p class="mb-6 flex items-center gap-2 text-xl font-bold">
		<span class="iconify size-8 hugeicons--reset-password"></span>
		<span class="flex-1">{title}</span>
		<ShowAndHidePasswordButton bind:showPassword />
	</p>
	{#if withCurrentPasswordField}
		<label>
			<span>Current password</span>
			<input
				class="input variant-form-material"
				name="current-password"
				type={inputsType}
				placeholder="Enter your current password"
				minlength="6"
				maxlength="200"
				required
				disabled={loading}
			/>
		</label>
	{/if}
	<label>
		<span>New password</span>
		<input
			class="input variant-form-material"
			name="new-password"
			type={inputsType}
			placeholder="Enter your new password"
			minlength="6"
			maxlength="200"
			required
			disabled={loading}
		/>
	</label>
	<label class="relative">
		<span>Confirm new password</span>
		<input
			class="input variant-form-material"
			name="confirmed-password"
			type={inputsType}
			placeholder="Confirm your new password"
			minlength="6"
			maxlength="200"
			required
			disabled={loading}
		/>
	</label>
	<div class="flex flex-row-reverse gap-3">
		<Button
			disabled={loading}
			size="sm"
			type="submit"
			class="variant-filled-primary gap-2 {loading ? 'cursor-progress' : ''}"
		>
			Change
			{#if loading}
				<LoadingSpinner />
			{:else}
				<span class="iconify size-5 hugeicons--reset-password"></span>
			{/if}
		</Button>
		{#if onCancel}
			<Button
				onclick={onCancel}
				disabled={loading}
				size="sm"
				type="button"
				class="variant-filled-surface gap-2"
			>
				{#if cancelButtonText}
					{cancelButtonText}
				{:else}
					Cancel
				{/if}
			</Button>
		{/if}
	</div>
</form>
