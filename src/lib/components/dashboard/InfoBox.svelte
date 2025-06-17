<script lang="ts">
	import { goto } from '$app/navigation';

	type InfoBoxProps = {
		title: string;
		value: number;
		icon: string;
		goTo?: string;
	};
	const { title, value, icon, goTo }: InfoBoxProps = $props();

	function navigate() {
		goTo && goto(goTo);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
	class="card flex h-full flex-col gap-4 p-4 {goTo ? 'cursor-pointer' : ''}"
	onclick={goTo ? navigate : undefined}
>
	<p class="font-medium">{title}</p>
	<div class="flex justify-between gap-2">
		<p class="text-3xl font-bold">{value}</p>
		<span class="iconify size-9 {icon}"></span>
	</div>
</div>
