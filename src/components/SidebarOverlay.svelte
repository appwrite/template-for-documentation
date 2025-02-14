<script lang="ts">
	import { onMount } from 'svelte';
	import { layoutStore } from '../stores/layout';

	const handleOverlayClick = () => {
		const leftSidebar = document.getElementById('left-sidebar');
		const rightSidebar = document.getElementById('right-sidebar');

		if (window.innerWidth < 1024) {
			if (leftSidebar) {
				leftSidebar.classList.add('-translate-x-full');
			}
			if (rightSidebar) {
				rightSidebar.classList.add('translate-x-full');
			}
			layoutStore.closeAll();
		}
	};

	onMount(() => {
		const overlay = document.getElementById('sidebar-overlay');
		overlay?.addEventListener('click', handleOverlayClick);

		return () => {
			overlay?.removeEventListener('click', handleOverlayClick);
		};
	});
</script>

<div
	id="sidebar-overlay"
	class="fixed inset-0 z-30 lg:hidden"
	class:hidden={!$layoutStore.isLeftSidebarOpen && !$layoutStore.isRightSidebarOpen}
	aria-hidden="true"
></div>
