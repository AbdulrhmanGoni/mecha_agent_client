<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import SignInWithGithub from '$lib/components/auth/SignInWithGithub.svelte';
	import UserCredentialsForm from '$lib/components/auth/UserCredentialsForm.svelte';
	import SignInErrorMessages from '$lib/components/auth/SignInErrorMessages.svelte';

	let isNewUser = $state(false);

	afterNavigate(({ to }) => {
		isNewUser = to?.url.searchParams.get('isNewUser') === 'true';
	});

	function changeIsNewUserQuery(isNewUser: boolean) {
		goto(isNewUser ? '/sign-in' : '/sign-in?isNewUser=true', { replaceState: true });
	}
</script>

<div class="flex flex-1 flex-col justify-center py-6 sm:py-12">
	<div
		class="variant-soft-surface flex w-full flex-col items-center space-y-3 rounded-2xl p-4 shadow-lg sm:mx-auto sm:max-w-2xl sm:p-10"
	>
		<UserCredentialsForm {isNewUser} />
		<span
			class="flex w-full items-center gap-2 before:h-0.5 before:w-[50%] before:border-b after:h-0.5 after:w-[50%] after:border-b"
		>
			OR
		</span>
		<SignInWithGithub />
		{#if isNewUser}
			<button onclick={() => changeIsNewUserQuery(true)}>Already have an account?, Sign in !</button
			>
		{:else}
			<button onclick={() => changeIsNewUserQuery(false)}>Don't have an account?, Create one</button
			>
		{/if}
		<SignInErrorMessages />
	</div>
</div>
