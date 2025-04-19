<script lang="ts">
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
	<span class="iconify size-7 hugeicons--alert-02"></span>
	<div class="alert-message !mt-0 text-start text-white">
		<h4 class="h4 font-bold">{title}</h4>
		<p class="!mt-0">{message}</p>
	</div>
	{#if actionIconName}
		<button onclick={actionFunction} aria-label="An action to be taken after the alert">
			<span class={`iconify size-7 ${actionIconName}`}></span>
		</button>
	{/if}
</div>
