<script>
	import { browser } from '$app/environment';
	import ItemSummary from './item-summary.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let showingCachedResults = false;

	if (browser) {
		if (data.items.length > 0) {
			localStorage.setItem('items', JSON.stringify(data.items));
		} else {
			data.items = JSON.parse(localStorage.getItem('items') ?? '');
			showingCachedResults = true;
		}
	}

	const PAGE_SIZE = 30;

	$: start = 1 + (data.page - 1) * PAGE_SIZE;
	$: next = `/${data.list}/${data.page + 1}`;
</script>

<svelte:head>
	<title
		>{`${data.list.charAt(0).toUpperCase()}${data.list.slice(1)}`} | Slacker News</title
	>
	<meta
		name="description"
		content="Latest Hacker News stories in the {data.list} category"
	/>
</svelte:head>

<div class="mx-auto max-w-prose">
	{#if showingCachedResults}
		<div
			class="inline-flex cursor-default select-none rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
		>
			Showing cached results
		</div>
	{/if}

	{#each data.items as item, i}
		{#if item}
			<ItemSummary {item} index={start + i} origin="{data.list}/{data.page}" />
			{#if i !== data.items.length - 1}
				<div class="border-b" />
			{/if}
		{/if}
	{/each}

	<div class="mt-10 flex h-20 items-center justify-between">
		{#if next}
			<a
				href={next}
				class="inline text-xs font-medium uppercase tracking-wide underline-offset-2 after:inline-block after:whitespace-pre after:content-['_→'] hover:underline"
				>Page {next.replace(/\/.*?\//, '')}</a
			>
		{/if}

		<a href="/" class="text-sm text-subtle">Slacker News</a>
	</div>
</div>
