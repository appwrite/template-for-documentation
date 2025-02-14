<script lang="ts">
	export let type: 'info' | 'warning' | 'error' = 'info';
</script>

<!-- Callout component -->
{#if type === 'info'}
	<div class="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
		<slot />
	</div>
{:else if type === 'warning'}
	<div
		class="my-6 rounded-r-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20"
	>
		<slot />
	</div>
{:else if type === 'error'}
	<div class="my-6 rounded-r-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
		<slot />
	</div>
{/if}

<style>
	div :global(p:last-child) {
		@apply mb-0;
	}
</style>
