<script>
	import ErrorPage from '$lib/components/shared/ErrorPage.svelte';
	import { page } from '$app/stores';
</script>

<ErrorPage
	title="Error!"
	errorMessage={$page.error?.message}
	iconName="hugeicons--rss-error"
	hideBackButton
	retryFn={() => window.location.reload()}
/>
