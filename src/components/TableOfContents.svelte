<script lang="ts">
	import { onMount } from 'svelte';
	import { layoutStore } from '../stores/layout';

	interface TOCItem {
		id: string;
		text: string;
		level: number;
	}

	let lockActiveId = false;
	let tocItems: TOCItem[] = [];
	let activeId: string | null = null;

	onMount(() => {
		// Get all headings from the main content
		const headings = document.querySelectorAll<HTMLHeadingElement>('main h2, main h3');
		const items: TOCItem[] = [];

		headings.forEach((heading) => {
			const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
			if (!heading.id) heading.id = id;

			items.push({
				id,
				text: heading.textContent || '',
				level: parseInt(heading.tagName[1])
			});
		});

		tocItems = items;

		// Set up intersection observer for active heading
		const observer = new IntersectionObserver(
			(entries) => {
				if (lockActiveId) return;

				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					activeId = visible[0].target.id;
				}
			},
			{
				rootMargin: '-100px 0px -66%'
			}
		);

		headings.forEach((heading) => observer.observe(heading));

		return () => observer.disconnect();
	});

	function handleClick(id: string) {
		activeId = id;
		lockActiveId = true;

		setTimeout(() => (lockActiveId = false), 300);

		const sidebar = document.getElementById('right-sidebar');
		if (window.innerWidth < 1024 && sidebar) {
			sidebar.classList.add('translate-x-full');
			layoutStore.closeAll();
		}
	}
</script>

<nav class="h-full overflow-y-auto p-4">
	<h2 class="mb-4 text-sm font-medium text-[#2D2D31] dark:text-gray-400">ON THIS PAGE</h2>
	<ul class="space-y-2">
		{#each tocItems as item}
			<li style="padding-left: {(item.level - 2) * 16}px">
				<a
					href={`#${item.id}`}
					class="block py-1 text-sm text-[#56565C] no-underline transition-colors hover:text-[#19191C] dark:text-gray-400 dark:hover:text-white"
					class:active={activeId === item.id}
					on:click={() => handleClick(item.id)}
				>
					{item.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	.active {
		@apply font-medium text-[#19191C] dark:text-white;
	}
</style>
