<script>
	import { browser } from '$app/environment';
	import { TrashIcon } from '$lib/icons';

	/** @type {{id: string}|{}} */
	let articles = {};

	let startedClear = false;

	if (browser) {
		articles = JSON.parse(localStorage.getItem('articles') ?? '{}');
	}

	function clearSavedArticles() {
		if (!startedClear) {
			startedClear = true;
			return;
		}

		if (browser) {
			localStorage.removeItem('articles');
			articles = {};
		}
	}
</script>

<svelte:head>
	<title>Library • Slacker News</title>
	<meta name="description" content="Local library of saved articles" />
</svelte:head>

<div class="mx-auto max-w-prose space-y-10">
	<div class="flex h-10 items-center justify-between">
		<h1 class="text-lg font-bold tracking-tight">Library</h1>
		{#if Object.keys(articles).length !== 0}
			<button
				on:click={clearSavedArticles}
				class="flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium {startedClear
					? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
					: 'bg-subtle/10 text-subtle hover:bg-text/10 hover:text-text'}"
				><TrashIcon size={16} thickness={2} />Clear library</button
			>
		{/if}
	</div>

	<p>
		Add articles to your library to read them later. Your library is stored
		locally for your current browser only.
	</p>

	<ul role="list" class="space-y-3">
		{#each Object.keys(articles) as articleId}
			<li>
				<a
					href="/item/{articleId}"
					class="flex cursor-pointer items-center justify-between gap-3 rounded-md bg-surface px-3 py-1.5 font-medium tracking-tight hover:bg-overlay"
					><span>{articles[articleId]}</span><span class="shrink-0 text-muted"
						>&rarr;</span
					></a
				>
			</li>
		{/each}
	</ul>
</div>
