<script lang="ts">
	import Icon from '@iconify/svelte';

	const alertVariants = {
		error: 'variant-filled-error',
		warning: 'variant-filled-warning',
		primary: 'variant-filled-primary',
		success: 'variant-filled-success'
	};

	type AlertProps = {
		title: string;
		message: string;
		variant: keyof typeof alertVariants;
		actionIconName?: string;
		actionFunction?: (
			e: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => void;
	};

	const { variant, title, message, actionIconName, actionFunction }: AlertProps = $props();
</script>

<div class={`alert ${alertVariants[variant]} flex-row items-center gap-3 px-3 py-2`}>
	<Icon icon="mingcute:alert-line" width="24" height="24" />
	<div class="alert-message !mt-0 text-start text-white">
		<h4 class="h4 font-bold">{title}</h4>
		<p class="!mt-0">{message}</p>
	</div>
	{#if actionIconName}
		<button onclick={actionFunction}>
			<Icon icon={actionIconName} width="27" height="27" />
		</button>
	{/if}
</div>
