<script lang="ts">
	export let stagger = false;
</script>

<div class="card-grid" class:stagger>
	<slot />
</div>

<style lang="postcss">
	.card-grid {
		@apply grid gap-6;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}

	.stagger {
		@apply md:grid-rows-2;
	}

	.stagger :global(> *) {
		@apply md:row-span-2;
	}

	.stagger :global(> *:nth-child(odd)) {
		@apply md:row-start-1;
	}

	.stagger :global(> *:nth-child(even)) {
		@apply md:row-start-2;
	}
</style>
