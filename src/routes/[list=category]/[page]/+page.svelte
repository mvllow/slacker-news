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
		<ItemSummary {item} index={start + i} origin="{data.list}/{data.page}" />
	{/if}
{/each}

{#if next}
	<div class="flex items-center gap-3 py-page-gutter">
		<a
			href={next}
			class="inline font-mono text-xs font-medium text-subtle underline-offset-2 after:inline-block after:whitespace-pre after:content-['_→'] hover:underline"
			>{data.page + 1}</a
		>
	</div>
{/if}
