<script lang="ts">
	import { Download, Brush, Blocks, Lightbulb, Sparkles } from 'lucide-svelte';

	export let title: string = '';
	export let icon: 'download' | 'brush' | 'blocks' | 'lightbulb' | 'sparkles' = 'download';
	export let gradient: 'blue' | 'purple' | 'orange' | 'green' = 'blue';

	const icons = {
		download: Download,
		brush: Brush,
		blocks: Blocks,
		lightbulb: Lightbulb,
		sparkles: Sparkles
	};

	const Icon = icons[icon];
</script>

<div class="card bg-gradient-to-br">
	<h3 class="title">
		<span class="icon">
			<svelte:component this={Icon} size={24} strokeWidth={2} />
		</span>
		{title}
	</h3>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply rounded-lg border border-[#EDEDF0] p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] dark:border-neutral-800 dark:bg-[#121212]/50;
	}

	.title {
		@apply mb-3 flex items-center gap-3 text-[18px] font-medium leading-[23.4px] tracking-[-0.0045em] text-[#19191C] dark:text-white;
	}

	.icon {
		@apply inline-flex items-center rounded-lg bg-white/50 p-2 text-[#19191C] dark:bg-neutral-800/50 dark:text-white;
	}

	.content {
		@apply text-[15px] leading-[19.6px] tracking-[-0.0045em] text-[#666687] dark:text-gray-400;
	}

	.content :global(p) {
		@apply m-0;
	}
</style>
