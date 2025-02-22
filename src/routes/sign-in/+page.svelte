<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
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
