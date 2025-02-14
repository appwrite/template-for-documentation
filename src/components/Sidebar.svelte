<script lang="ts">
	import { layoutStore } from '../stores/layout';
	import Search from './Search.svelte';

	interface NavItem {
		label: string;
		link?: string;
		items?: NavItem[];
	}

	export let navigation: NavItem[] = [];
	let currentPath = '';

	// Update current path on client side
	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}

	function isCurrentPage(path: string | undefined): boolean {
		if (!path) return false;
		return currentPath === path || currentPath === path + '/';
	}

	function handleNavigation() {
		const sidebar = document.getElementById('left-sidebar');
		if (window.innerWidth < 1024 && sidebar) {
			sidebar.classList.add('-translate-x-full');
			layoutStore.closeAll();
		}
	}
</script>

<nav class="h-full overflow-y-auto px-4 py-2">
	<div class="space-y-6">
		<!-- Mobile Search -->
		<div class="mb-4 lg:hidden">
			<Search />
		</div>

		<!-- Top level items -->
		<div class="space-y-1">
			{#each navigation.filter((item) => item.link) as item}
				{#if item.link}
					<a
						href={item.link}
						class="block px-4 py-2 text-[15px] font-normal leading-[19.6px] tracking-[-0.0045em] text-[#666687] no-underline transition-colors hover:text-[#2D2D31]"
						class:active={isCurrentPage(item.link)}
						aria-current={isCurrentPage(item.link) ? 'page' : undefined}
						on:click={handleNavigation}
					>
						{item.label}
					</a>
				{/if}
			{/each}
		</div>

		<!-- Groups -->
		{#each navigation.filter((item) => !item.link) as item}
			{#if item.items}
				<div class="pt-6 first:mx-auto first:w-[210px] first:border-t first:border-[#EDEDF0]">
					<div
						class="mb-3 px-4 text-[13px] font-medium uppercase leading-[15.6px] tracking-[-0.01em] text-[#2D2D31] dark:text-white"
					>
						{item.label}
					</div>
					<div class="space-y-1">
						{#each item.items as subItem}
							{#if subItem.link}
								<a
									href={subItem.link}
									class="block px-4 py-2 text-[15px] font-normal leading-[19.6px] tracking-[-0.0045em] text-[#666687] no-underline transition-colors hover:text-[#2D2D31]"
									class:active={isCurrentPage(subItem.link)}
									aria-current={isCurrentPage(subItem.link) ? 'page' : undefined}
									on:click={handleNavigation}
								>
									{subItem.label}
								</a>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</nav>

<style lang="postcss">
	.active {
		@apply rounded-md bg-[#F4F4F7] font-normal text-[#2D2D31];
	}

	:global(.dark) .active {
		@apply bg-neutral-800 text-white;
	}

	:global(.dark) a {
		@apply text-neutral-400 hover:text-white;
	}
</style>
