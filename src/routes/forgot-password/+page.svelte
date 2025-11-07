<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import OtpInput from '$lib/components/auth/OtpInput.svelte';
	import UserPasswordForm from '$lib/components/shared/UserPasswordForm.svelte';
	import Alert from '$lib/components/shared/Alert.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let existantEmail = $state('');
	let openResetPasswordForm = $state(false);
	let loading = $state(false);

	function submitVerifyEmailRequest(e: SubmitFormEvent) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email')?.toString() || '';

		loading = true;
		clientFetchAPI<boolean>({
			path: '/api/verify-email' + `?email=${email}&checkExistance=true`
		})
			.then(async (exists) => {
				if (!exists) {
					toastStore.trigger({
						message: 'The email address you entered does not exist',
						background: 'variant-filled-error',
						timeout: 5000
					});
					return;
				}

				existantEmail = email;
			})
			.catch((error) => {
				toastStore.trigger({
					message: error,
					background: 'variant-filled-error',
					timeout: 5000
				});
			})
			.finally(() => {
				loading = false;
			});
	}

	function onVerify() {
		toastStore.trigger({
			message: 'Your email has been verified successfully. You can now reset your password.',
			background: 'variant-filled-success',
			timeout: 5000
		});
		openResetPasswordForm = true;
	}

	function submitResetPasswordRequest({ newPassword, confirmedPassword }: UserPasswordFormValues) {
		if (newPassword !== confirmedPassword) {
			toastStore.trigger({
				message: 'Passwords do not match',
				background: 'variant-filled-error',
				timeout: 5000
			});
			return;
		}

		loading = true;
		clientFetchAPI<string>({
			path: '/api/reset-password',
			method: 'POST',
			body: { email: existantEmail, newPassword }
		})
			.then((res) => {
				toastStore.trigger({
					message: res,
					background: 'variant-filled-success',
					timeout: 5000
				});
				goto('/sign-in', { replaceState: true });
			})
			.catch((error) => {
				toastStore.trigger({
					message: error,
					background: 'variant-filled-error',
					timeout: 5000
				});
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<div class="flex flex-1 flex-col justify-center py-6 sm:py-12">
	<div
		class="variant-soft-surface flex w-full flex-col items-center space-y-3 rounded-2xl p-4 text-center shadow-lg sm:mx-auto sm:max-w-2xl sm:p-8"
	>
		{#if openResetPasswordForm}
			<UserPasswordForm
				title="Reset Password"
				onSubmit={submitResetPasswordRequest}
				{loading}
				onCancel={() => {
					openResetPasswordForm = false;
					existantEmail = '';
				}}
			/>
			<Alert
				title="Warning"
				variant="warning"
				message="You have 3 minutes to reset your password before the verification expires."
			/>
		{:else if existantEmail}
			<OtpInput bind:email={existantEmail} verificationPurpose="reset-password" {onVerify} />
		{:else}
			<button
				type="button"
				class="self-start"
				aria-label="Back to sign in form"
				onclick={() => {
					goto('/sign-in');
				}}
			>
				<span class="iconify size-7 hugeicons--arrow-left-02"></span>
			</button>
			<img src="/Authentication.svg" alt="Forgot Password illustration" class="w-60 sm:w-72" />
			<h1 class="text-2xl font-bold sm:text-3xl">Forgot your password?</h1>
			<p class="sm:text-lg">
				Fine, Just verify your email address and we will let you reset your password.
			</p>
			<form onsubmit={submitVerifyEmailRequest} class="flex w-full gap-2">
				<input
					class="input variant-form-material"
					name="email"
					type="email"
					placeholder="Enter your email address"
					required
					value={page.url.searchParams.get('email') || ''}
					autocomplete="email"
				/>
				<Button size="sm" type="submit" disabled={loading} class="variant-filled-primary gap-2">
					Verify
					{#if loading}
						<LoadingSpinner />
					{:else}
						<span class="iconify size-5 hugeicons--security-check"></span>
					{/if}
				</Button>
			</form>
		{/if}
	</div>
</div>
