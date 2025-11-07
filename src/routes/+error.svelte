<script>
	import ErrorPage from '$lib/components/shared/ErrorPage.svelte';
	import { page } from '$app/state';
</script>

<ErrorPage
	title="Error!"
	errorMessage={page.error?.message}
	iconName="hugeicons--rss-error"
	hideBackButton
	hideRetryButton={page.error?.status != 404}
	retryFn={() => window.location.reload()}
/>
