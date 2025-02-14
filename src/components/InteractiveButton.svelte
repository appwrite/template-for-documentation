<script>
	let count = 0;
	const increment = () => (count += 1);
</script>

<button
	class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
	on:click={increment}
>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<style>
	button {
		font-family: system-ui, sans-serif;
	}
</style>
