<script lang="ts">
	const { className }: { className?: string } = $props();
</script>

<span class={`svg-spinners--6-dots-rotate ${className || 'size-5'}`}></span>

<style>
	.svg-spinners--6-dots-rotate {
		display: inline-block;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg%3E%3Ccircle cx='12' cy='2.5' r='1.5' fill='%23000' opacity='0.14'/%3E%3Ccircle cx='16.75' cy='3.77' r='1.5' fill='%23000' opacity='0.29'/%3E%3Ccircle cx='20.23' cy='7.25' r='1.5' fill='%23000' opacity='0.43'/%3E%3Ccircle cx='21.5' cy='12' r='1.5' fill='%23000' opacity='0.57'/%3E%3Ccircle cx='20.23' cy='16.75' r='1.5' fill='%23000' opacity='0.71'/%3E%3Ccircle cx='16.75' cy='20.23' r='1.5' fill='%23000' opacity='0.86'/%3E%3Ccircle cx='12' cy='21.5' r='1.5' fill='%23000'/%3E%3CanimateTransform attributeName='transform' calcMode='discrete' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
