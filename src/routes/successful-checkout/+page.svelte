<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/shared/Button.svelte';

	function home() {
		goto('/', { replaceState: true });
	}
</script>

<div class="mt-10 flex flex-1 flex-col items-center gap-3 text-center sm:mt-32">
	<img src="/Online-Payment.svg" alt="" class="w-72 sm:w-96" />
	<h1 class="text-3xl font-bold sm:text-4xl">Thank You for Subscribing</h1>
	<p class="sm:text-lg">
		Your subscription was successful! <br />
		You now have access to all the features included in your chosen plan 🥳.
	</p>
	<Button onclick={home} class="variant-filled-primary gap-2">
		<span class="iconify size-5 hugeicons--home-03"></span>
		Back to Dashboard
	</Button>
</div>
