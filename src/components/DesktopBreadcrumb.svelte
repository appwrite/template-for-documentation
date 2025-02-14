<script lang="ts">
	export let group: string | undefined;
	export let title: string;

	// Get the current path
	let currentPath = '';
	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}

	// If we're on the index page (root path), always show "Home"
	$: displayTitle = currentPath === '/' ? 'Home' : title;
</script>

<div
	class="mb-8 hidden text-[15px] font-normal leading-[19.6px] tracking-[-0.0045em] text-[#56565C] dark:text-[#A3A3A0] lg:block"
>
	{#if group}
		<span>{group} / </span>
	{/if}
	<span class="text-[#2D2D31] dark:text-white">{displayTitle}</span>
</div>
