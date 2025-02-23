<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { signIn } from '@auth/sveltekit/client';

	type UserCredentialsFormProps = {
		isNewUser: boolean;
	};

	const { isNewUser }: UserCredentialsFormProps = $props();

	function submitHandler(event: SubmitFormEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		signIn('credentials', {
			username: formData.get('username'),
			email: formData.get('email'),
			password: formData.get('password')
		});
	}
</script>

<div class="flex w-full flex-col items-center space-y-3">
	<Avatar width="w-24" src="/mecha_agent_logo_2.webp">MA</Avatar>
	<h1 class="text-2xl font-bold">
		Sign
		{#if isNewUser}
			in
		{:else}
			up
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
