<script lang="ts">
	export let type: 'single' | 'variants' | 'states';
</script>

<div
	class="my-8 rounded-lg border border-[#EDEDF0] bg-white dark:border-neutral-800 dark:bg-[#121212]"
>
	<div class="flex flex-wrap items-center justify-center gap-2 p-8 py-16">
		<slot />
	</div>
</div>

<style>
	/* Ensure consistent spacing in MDX */
	div :global(p) {
		margin: 0;
	}
</style>
