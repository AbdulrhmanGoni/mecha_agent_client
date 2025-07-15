<script lang="ts">
	import ChangePasswordForm from '$lib/components/profile/ChangePasswordForm.svelte';
	import Button from '$lib/components/shared/Button.svelte';

	const { user }: { user: User } = $props();
	let changePasswordFormOpen = $state(false);

	function closeChangePasswordForm() {
		changePasswordFormOpen = false;
	}

	const passwordCantBeChanged = user.signingMethod !== 'credentials';
</script>

<div class="space-y-3">
	{#if !changePasswordFormOpen}
		<p class="flex items-center gap-2 text-xl font-bold">
			<span class="iconify size-8 hugeicons--reset-password"></span>
			<span>Change Password</span>
		</p>
	{/if}
	<p class="secondary-text-color">
		{#if passwordCantBeChanged}
			You cannot change your password because you have signed up with
			<strong>{user.signingMethod}</strong>
		{:else}
			You can change your password here whenever you want if you have signed up with your
			<strong>Email</strong> and <strong>Password</strong>
		{/if}
	</p>
	{#if changePasswordFormOpen}
		<ChangePasswordForm
			onCancel={closeChangePasswordForm}
			onChangeSucceed={closeChangePasswordForm}
		/>
	{:else}
		<Button
			class="{passwordCantBeChanged
				? 'variant-filled-surface cursor-not-allowed'
				: 'variant-filled-primary'} gap-2"
			onclick={() => {
				changePasswordFormOpen = true;
			}}
			disabled={passwordCantBeChanged}
		>
			Change Password
		</Button>
	{/if}
</div>
