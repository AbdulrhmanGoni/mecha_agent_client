<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import SignInWithGithub from '$lib/components/auth/SignInWithGithub.svelte';
	import SignInWithGoogle from '$lib/components/auth/SignInWithGoogle.svelte';
	import UserCredentialsForm from '$lib/components/auth/UserCredentialsForm.svelte';
	import SignInErrorMessages from '$lib/components/auth/SignInErrorMessages.svelte';
	import { PUBLIC_GOOGLE_VERIFICATION_SITE_TOKEN } from '$env/static/public';

	let isNewUser = $state(false);

	afterNavigate(({ to }) => {
		isNewUser = to?.url.searchParams.get('isNewUser') === 'true';
	});

	function changeIsNewUserQuery(isNewUser: boolean) {
		goto(isNewUser ? '/sign-in' : '/sign-in?isNewUser=true', { replaceState: true });
	}
</script>

<svelte:head>
	<title>Sign in into Mecha Agent</title>
	<meta
		name="description"
		content={'Sign in into "Mecha Agent" App where you create your own AI agent chatbots, ' +
			'Give them custom knowledge and instructions, ' +
			'And publish them for the world to interact and chat with.'}
	/>
	<meta name="google-site-verification" content={PUBLIC_GOOGLE_VERIFICATION_SITE_TOKEN} />
</svelte:head>

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
		<SignInWithGoogle />
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
