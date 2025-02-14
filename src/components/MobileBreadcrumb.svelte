<script lang="ts">
	import { onMount } from 'svelte';
	import { layoutStore } from '../stores/layout';

	export let group: string | undefined;
	export let title: string;

	// Get the current path
	let currentPath = '';
	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}

	// If we're on the index page (root path), always show "Home"
	$: displayTitle = currentPath === '/' ? 'Home' : title;

	onMount(() => {
		const sidebarToggle = document.getElementById('sidebar-toggle');
		const leftSidebar = document.getElementById('left-sidebar');

		sidebarToggle?.addEventListener('click', () => {
			leftSidebar?.classList.toggle('-translate-x-full');
			layoutStore.toggleLeftSidebar();
		});
	});
</script>

<div
	class="fixed left-0 right-0 top-14 z-30 border-b border-[#EDEDF0] bg-white dark:border-neutral-800 dark:bg-[#121212] lg:hidden"
>
	<div class="flex h-12 items-center gap-2 px-4">
		<button
			id="sidebar-toggle"
			class="-ml-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
			aria-label="Toggle navigation menu"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-gray-600 dark:text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
		<div
			class="text-[15px] font-normal leading-[19.6px] tracking-[-0.0045em] text-[#56565C] dark:text-[#A3A3A0]"
		>
			{#if group}
				<span>{group} / </span>
			{/if}
			<span class="text-[#2D2D31] dark:text-white">{displayTitle}</span>
		</div>
	</div>
</div>

<!-- Spacer for mobile layout -->
<div class="h-12 lg:hidden" aria-hidden="true"></div>
