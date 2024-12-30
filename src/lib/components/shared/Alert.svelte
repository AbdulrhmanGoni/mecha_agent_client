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
		avtionIconName?: string;
		avtionFunction?: (
			e: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => void;
	};

	const { variant, title, message, avtionIconName, avtionFunction }: AlertProps = $props();
</script>

<div class={`alert ${alertVariants[variant]} p-3" flex-row items-center gap-3`}>
	<Icon icon="mingcute:alert-line" width="24" height="24" />
	<div class="alert-message !mt-0 text-start text-white">
		<h4 class="h4">{title}</h4>
		<p class="!mt-0">{message}</p>
	</div>
	{#if avtionIconName}
		<button onclick={avtionFunction}>
			<Icon icon={avtionIconName} width="27" height="27" />
		</button>
	{/if}
</div>
