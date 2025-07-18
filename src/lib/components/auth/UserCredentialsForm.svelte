<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import Logo from '../Logo.svelte';
	import OtpInput from './OtpInput.svelte';
	import ShowAndHidePasswordButton from '../shared/ShowAndHidePasswordButton.svelte';

	type UserCredentialsFormProps = {
		isNewUser: boolean;
	};

	type NewUser = {
		username: string;
		email: string;
		password: string;
	};

	const { isNewUser }: UserCredentialsFormProps = $props();

	let newUser: NewUser | undefined = $state(undefined);
	let openOtpFormFor: string | undefined = $state();

	function submitHandler(e: SubmitFormEvent) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const email = formData.get('email')?.toString()!;

		newUser = {
			username: formData.get('username') as string,
			email,
			password: formData.get('password') as string
		};

		if (!isNewUser) {
			return signIn('credentials', newUser);
		}

		openOtpFormFor = email;
	}

	function submitCredentials() {
		newUser && signIn('credentials', newUser);
	}

	let showPassword = $state(false);
</script>

{#if isNewUser && openOtpFormFor}
	<OtpInput
		bind:email={openOtpFormFor}
		onVerify={submitCredentials}
		verificationPurpose="sign-up"
	/>
{:else}
	<div class="flex w-full flex-col items-center space-y-3">
		<Logo className="w-24" />
		<h1 class="text-2xl font-bold">
			Sign
			{#if isNewUser}
				up
			{:else}
				in
			{/if}
			into
			<span class="text-primary-500">Mecha Agent</span>
		</h1>
		<form id="user-credentials-form" class="flex w-full flex-col gap-3" onsubmit={submitHandler}>
			{#if isNewUser}
				<label class="label">
					<span>Username</span>
					<input
						class="input variant-form-material"
						name="username"
						type="text"
						placeholder="Enter your name"
						required
						minlength="3"
						maxlength="80"
					/>
				</label>
			{/if}

			<label class="label">
				<span>Email</span>
				<input
					class="input variant-form-material"
					name="email"
					type="email"
					placeholder="Enter your email"
					required
				/>
			</label>

			<label class="label">
				<div class="flex items-center justify-between">
					Password
					<ShowAndHidePasswordButton bind:showPassword />
				</div>
				<input
					class="input variant-form-material"
					name="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Enter your password"
					required
					minlength="6"
					maxlength="200"
				/>
			</label>

			<div class="flex flex-wrap items-center gap-3">
				<a class="flex-1 text-sm hover:underline" href="/forgot-password">
					Forgot your password?, Reset it
				</a>
				<button class="btn btn-sm self-end bg-primary-500 text-white sm:btn-md" type="submit">
					Sign
					{#if isNewUser}
						up
					{:else}
						in
					{/if}
				</button>
			</div>
		</form>
	</div>
{/if}
