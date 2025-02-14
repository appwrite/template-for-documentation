<script lang="ts">
	export let index: number = 0;
	export let activeTab: number = 0;
</script>

<div
	role="tabpanel"
	id={`panel-${index}`}
	aria-labelledby={`tab-${index}`}
	hidden={activeTab !== index}
>
	{#if activeTab === index}
		<slot />
	{/if}
</div>
