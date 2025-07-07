<script lang="ts">
	const { className }: { className: string } = $props();
	const email = 'mechaagent@gmail.com';
</script>

<a class={className} href="mailto:{email}">{email}</a>
