<script lang="ts">
	const { className }: { className: string } = $props();
	const email = 'abdulrhmangoni@gmail.com';
</script>

<a class={className} href="mailto:{email}">{email}</a>
