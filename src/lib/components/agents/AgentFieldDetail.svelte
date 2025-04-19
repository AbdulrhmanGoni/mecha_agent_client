<script lang="ts">
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
	<h4 class="h4 line-clamp-2 flex items-center gap-2 font-bold">
		<span class={`iconify ${iconName} size-7`}></span>
		{title}
		{#if description}
			<span use:popup={popupHover} class="group cursor-help p-1 [&>*]:pointer-events-none">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
					<g fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10" />
						<path
							stroke-linecap="round"
							d="M10 8.484C10.5 7.494 11 7 12 7c1.246 0 2 .989 2 1.978s-.5 1.483-2 2.473V13m0 3.5v.5"
						/>
					</g>
				</svg>
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
		<p class="italic text-surface-400 dark:text-surface-300">{noValueMessage}</p>
	{/if}
</div>
