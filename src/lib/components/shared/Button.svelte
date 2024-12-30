<script lang="ts">
	const buttonSizesMap: Record<Required<CustomButtonProps>['size'], string> = {
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};

	const { children, size = 'md', ...props }: CustomButtonProps = $props();
</script>

<button
	type="button"
	{...props}
	class={`${props.class || ''} flex items-center gap-1 rounded-md font-semibold ${buttonSizesMap[size]}`}
>
	{@render children?.()}
</button>
