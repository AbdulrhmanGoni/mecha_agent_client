<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/shared/Button.svelte';
	import SupportEmail from '$lib/components/shared/SupportEmail.svelte';

	function home() {
		goto('/', { replaceState: true });
	}

	const session_id = $page.url.searchParams.get('session_id');
</script>

{#if !$page.data.checkSessionSuccess}
	<div class="mt-10 flex flex-1 flex-col items-center gap-3 text-center sm:mt-32">
		<img src="/docs/Online-Payment.svg" alt="" class="w-72 sm:w-96" />
		<h1 class="text-3xl font-bold sm:text-4xl">Thank You for Subscribing</h1>
		<p class="sm:text-lg">
			Your subscription was successful! You now have access to all the features included in your
			plan 🥳.
		</p>
		<Button onclick={home} class="variant-filled-primary gap-2">
			<span class="iconify size-5 hugeicons--home-03"></span>
			Back to Dashboard
		</Button>
	</div>
{:else}
	<div class="flex flex-1 flex-col items-center justify-center gap-3 p-4">
		<span class="iconify size-24 hugeicons--credit-card-not-found"></span>
		<h2 class="h2 font-bold">Subscription Not Found</h2>
		<p class="max-w-3xl text-center sm:text-lg">
			We couldn't verify a subscription with the ID: <strong>{session_id}</strong>. If you've
			recently completed your subscription, please allow a few minutes for processing and try again.
			If the issue persists, feel free to reach out to us at
			<SupportEmail className="font-medium underline" />.
		</p>
	</div>
{/if}
