<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import Logo from '../Logo.svelte';
	import OtpInput from './OtpInput.svelte';

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
</script>

{#if isNewUser && openOtpFormFor}
	<OtpInput email={openOtpFormFor} onVerify={submitCredentials} />
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
				<span>Password</span>
				<input
					class="input variant-form-material"
					name="password"
					type="password"
					placeholder="Enter your password"
					required
					minlength="6"
					maxlength="200"
				/>
			</label>

			<button class="btn self-end bg-primary-500 text-white" type="submit">
				Sign
				{#if isNewUser}
					up
				{:else}
					in
				{/if}
			</button>
		</form>
	</div>
{/if}
