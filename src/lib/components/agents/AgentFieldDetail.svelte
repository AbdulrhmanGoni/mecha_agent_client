<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	type Props = {
		title: string;
		value?: string;
		noValueMessage?: string;
		iconName: string;
		valueStyle?: string;
		description?: string;
	};

	const { title, value, noValueMessage, iconName, valueStyle, description }: Props = $props();

	const popupHover: PopupSettings = {
		event: 'hover',
		target: title,
		placement: 'top'
	};
</script>

<div class="space-y-2">
	<h4 class="h4 line-clamp-2 flex items-center gap-1 font-bold">
		<Icon icon={iconName} width="24" height="24" />
		{title}
		{#if description}
			<span use:popup={popupHover} class="group cursor-help p-1 [&>*]:pointer-events-none">
				<Icon
					icon="mingcute:question-line"
					width="16"
					height="16"
					class="group-hover:stroke-warning-500"
				/>
			</span>
			<div class="variant-filled-surface rounded-md p-1.5 text-sm" data-popup={title}>
				<p>{description}</p>
				<div class="variant-filled-surface arrow"></div>
			</div>
		{/if}
	</h4>
	{#if value}
		<p class={valueStyle}>{value}</p>
	{:else}
		<p class="italic !text-surface-300">{noValueMessage}</p>
	{/if}
</div>
