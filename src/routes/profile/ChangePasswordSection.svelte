<script lang="ts">
	import ChangePasswordForm from '$lib/components/profile/ChangePasswordForm.svelte';
	import Button from '$lib/components/shared/Button.svelte';

	const { user }: { user: User } = $props();
	let changePasswordFormOpen = $state(false);

	function closeChangePasswordForm() {
		changePasswordFormOpen = false;
	}
</script>

<div class="space-y-3">
	{#if !changePasswordFormOpen}
		<p class="flex items-center gap-2 text-xl font-bold">
			<span class="iconify size-8 hugeicons--reset-password"></span>
			<span>Change Password</span>
		</p>
	{/if}
	{#if user.signingMethod === 'credentials'}
		<p class="secondary-text-color">
			You can change your password here whenever you want if you have signed up with your
			<strong>Email</strong> and <strong>Password</strong>
		</p>
	{/if}
	{#if changePasswordFormOpen}
		<ChangePasswordForm
			onCancel={closeChangePasswordForm}
			onChangeSucceed={closeChangePasswordForm}
		/>
	{:else}
		<Button
			class="variant-filled-primary gap-2"
			onclick={() => {
				changePasswordFormOpen = true;
			}}
		>
			Change Password
		</Button>
	{/if}
</div>
