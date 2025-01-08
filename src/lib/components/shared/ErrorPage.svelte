<script lang="ts">
	import Button from '../shared/Button.svelte';
	import Icon from '@iconify/svelte';
	import BackButton from './BackButton.svelte';

	type ErrorPageProps = {
		errorMessage: string;
		title: string;
		iconName: string;
		retryFn?: () => void;
		hideBackButton?: boolean;
		hideRetryButton?: boolean;
	};

	const {
		errorMessage,
		title,
		iconName,
		retryFn,
		hideBackButton,
		hideRetryButton
	}: ErrorPageProps = $props();
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-3 p-4">
	<Icon icon={iconName} width="100" height="100" />
	<h2 class="h2 font-bold">{title}</h2>
	<p class="text-center sm:text-lg">
		{#if errorMessage}
			{errorMessage}
		{:else}
			Something wrong happened, retry or refresh the page
		{/if}
	</p>
	<div class="flex gap-2">
		{#if !hideRetryButton}
			<Button size="sm" onclick={retryFn} class="variant-filled-primary">
				<Icon icon="stash:arrow-retry" width="25" height="25" />
				Retry
			</Button>
		{/if}
		{#if !hideBackButton}
			<BackButton size="sm" />
		{/if}
	</div>
</div>
