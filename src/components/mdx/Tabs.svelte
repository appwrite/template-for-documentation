<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let labels: string[] = [];
	let activeTab = 0;

	const dispatch = createEventDispatcher();

	function selectTab(index: number) {
		activeTab = index;
		dispatch('change', { index });
	}
</script>

<div class="tabs">
	<div class="tab-list" role="tablist">
		{#each labels as label, i}
			<button
				role="tab"
				aria-selected={activeTab === i}
				aria-controls={`panel-${i}`}
				id={`tab-${i}`}
				class="tab-button"
				class:active={activeTab === i}
				on:click={() => selectTab(i)}
			>
				{label}
			</button>
		{/each}
	</div>
	<div class="tab-panels">
		<slot {activeTab} />
	</div>
</div>

<style lang="postcss">
	.tabs {
		@apply mb-6;
	}

	.tab-list {
		@apply flex gap-1 border-b border-gray-200 dark:border-neutral-800;
	}

	.tab-button {
		@apply px-4 py-2 text-sm text-[#56565C] transition-colors hover:text-[#2D2D31] dark:text-gray-400 dark:hover:text-white;
	}

	.tab-button.active {
		@apply -mb-px border-b-2 border-[#4945FF] text-[#4945FF] dark:border-white dark:text-white;
	}

	.tab-panels {
		@apply mt-4;
	}
</style>
