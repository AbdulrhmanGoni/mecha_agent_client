<script lang="ts">
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { onMount } from 'svelte';
	import Button from '../shared/Button.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Alert from '../shared/Alert.svelte';

	type Props = {
		email: string;
		onVerify: () => void;
		verificationPurpose: EmailVerificationPurpose;
	};

	let { email = $bindable(), onVerify, verificationPurpose }: Props = $props();

	const otpAgeInMinutes = 3;

	let loading = $state(false);
	let otpSignature = $state('');
	let sendOtpError = $state('');
	let otpExpired = $state(false);
	let otpTimerStartTimestamp = $state(new Date().setMinutes(otpAgeInMinutes, 0));
	let otpExpiresAfter = $state(otpAgeInMinutes + ':00');
	let otpTimerIntervalId: NodeJS.Timeout | string | number | undefined = $state(undefined);

	const toastStore = getToastStore();

	function requestOTP() {
		loading = true;
		clientFetchAPI<string>({ path: `/api/verify-email?email=${email}` })
			.then((signature) => {
				clearInterval(otpTimerIntervalId);
				otpSignature = signature;
				if (otpExpired) otpExpired = false;
				otpTimerStartTimestamp = new Date().setMinutes(otpAgeInMinutes, 0);
				otpExpiresAfter = otpAgeInMinutes + ':00';
				sendOtpError = '';
				otpTimerIntervalId = setInterval(() => {
					if (otpExpiresAfter === '0:00') {
						otpExpired = true;
						otpExpiresAfter = otpAgeInMinutes + ':00';
						clearInterval(otpTimerIntervalId);
						return;
					}
					otpTimerStartTimestamp = otpTimerStartTimestamp - 1000;
					// Extract minutes and seconds part from ISO format (e.g, '2025-07-07T17:02:54.934Z' => '02:54')
					otpExpiresAfter = new Date(otpTimerStartTimestamp).toISOString().slice(15, 19);
				}, 1000);
			})
			.catch((error) => {
				sendOtpError = error;
			})
			.finally(() => {
				loading = false;
			});
	}

	onMount(requestOTP);

	function onSubmit(e: SubmitFormEvent) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const otp = formData.entries().reduce((otp, input) => otp + input[1], '');

		loading = true;

		const query = new URLSearchParams([
			['email', email],
			['otp', otp],
			['signature', otpSignature],
			['purpose', verificationPurpose]
		]);

		clientFetchAPI<boolean>({
			path: `/api/verify-email?${query.toString()}`,
			method: 'POST'
		})
			.then((res) => {
				if (res) {
					onVerify();
				}
			})
			.catch((error) => {
				toastStore.trigger({
					message: error,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<form class="flex min-h-60 flex-col justify-center gap-3" onsubmit={onSubmit}>
	<button
		type="button"
		class="w-fit"
		onclick={() => {
			email = '';
		}}
		aria-label="Back to sign up form"
	>
		<span class="iconify size-7 hugeicons--arrow-left-02"></span>
	</button>
	{#if loading}
		<LoadingSpinner className="size-14" />
	{:else if sendOtpError}
		<Alert
			title="OTP Request Failed"
			variant="error"
			message={sendOtpError}
			actionIconName="hugeicons--refresh"
			actionFunction={requestOTP}
		/>
	{:else if otpSignature}
		{#if otpExpired}
			<p class="secondary-text-color text-center">
				⚠️ The OTP we sent to your email has gotten expired ⚠️
			</p>
		{:else}
			<h1 class="text-center text-xl font-semibold">Enter the sent OTP to your email</h1>
			<p class="secondary-text-color text-center">
				Look for the OTP in your spam folder if you couldn't find it in your mail box
			</p>
			<div class="flex justify-center gap-3">
				{#each [1, 2, 3, 4, 5, 6] as inputNumber}
					<!-- svelte-ignore a11y_autofocus -->
					<input
						id="otp-field-{inputNumber}"
						name="otp-field-{inputNumber}"
						class="input variant-form-material size-12 text-center"
						type="text"
						pattern="\d"
						required
						maxlength="1"
						autofocus={inputNumber === 1}
						oninput={(e) => {
							e.currentTarget.value = e.currentTarget.value.trim();
							e.currentTarget.value &&
								document.getElementById(`otp-field-${inputNumber + 1}`)?.focus();
						}}
					/>
				{/each}
			</div>
			<span class="text-center">
				The OTP will expire after: {otpExpiresAfter}
			</span>
			<Button class="variant-filled-primary mx-auto" type="submit">Send</Button>
		{/if}
		<button type="button" class="underline" onclick={requestOTP}>Request another OTP</button>
	{/if}
</form>
