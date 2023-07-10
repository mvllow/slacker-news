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
	$: previous = data.page > 1 && `/${data.list}/${data.page - 1}`;
	$: next = data.page < data.maxPages && `/${data.list}/${data.page + 1}`;
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

{#if showingCachedResults}
	<div
		class="inline-flex cursor-default select-none rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
	>
		Showing cached results
	</div>
{/if}

{#each data.items as item, i}
	{#if item}
		<ItemSummary {item} index={start + i} />
	{/if}
{/each}

{#if previous || next}
	<div class="mt-page-gutter flex items-center gap-3">
		{#if previous}
			<a
				href={previous}
				class="flex items-center justify-center rounded-full bg-surface px-3 py-1.5 font-mono text-xs font-medium"
				><span class="text-subtle">&larr;</span>&nbsp;{data.page - 1}</a
			>
		{/if}

		<div class="flex-1" />

		{#if next}
			<a
				href={next}
				class="flex items-center justify-center rounded-full bg-surface px-3 py-1.5 font-mono text-xs font-medium"
				>{data.page + 1}&nbsp;<span class="text-subtle">&rarr;</span></a
			>
		{/if}
	</div>
{/if}
