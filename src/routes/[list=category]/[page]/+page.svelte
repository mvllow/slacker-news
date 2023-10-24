<script>
	import { browser } from '$app/environment';
	import Capsule from '$lib/capsule.svelte';
	import { ArrowPathIcon } from '$lib/icons';
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
	<Capsule banner href="javascript:window.location.href=window.location.href">
		<ArrowPathIcon size={16} />
		<span>Showing potentially outdated content</span>
	</Capsule>
{/if}

{#each data.items as item}
	{#if item}
		<ItemSummary {item} />
	{/if}
{/each}

{#if previous || next}
	<div class="mt-page-gutter flex items-center gap-3">
		{#if previous}
			<Capsule href={previous}>&larr; Page {data.page - 1}</Capsule>
		{/if}

		<div class="flex-1" />

		{#if next}
			<Capsule href={next}>Page {data.page + 1} &rarr;</Capsule>
		{/if}
	</div>
{/if}
