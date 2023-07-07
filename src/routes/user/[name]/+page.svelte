<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.id} | Slacker News</title>
	<meta name="description" content="Hacker News user profile for {data.id}" />
</svelte:head>

<h1 class="sr-only">{data.id}</h1>

<div class="space-y-6">
	<div class="space-y-1.5">
		<p class="text-lg font-bold sm:text-3xl sm:tracking-tight">
			{data.id}
		</p>

		<p class="text-sm text-subtle">
			Joined {data.created}, with {data.karma} karma
		</p>
	</div>

	{#if data.about}
		<h2 class="font-bold">About</h2>

		<div class="space-y-3">
			{@html '<p>' + data.about}
		</div>
	{/if}

	<h2 class="font-bold">Links</h2>

	<ul role="list" class="[&_a]:leading-loose">
		<li>
			<a
				href="https://news.ycombinator.com/submitted?id={data.id}"
				class="inline text-sm font-medium tracking-wide underline-offset-2 after:inline-block after:whitespace-pre after:content-['_↗'] hover:underline"
				>Submissions</a
			>
		</li>
		<li>
			<a
				href="https://news.ycombinator.com/threads?id={data.id}"
				class="inline text-sm font-medium tracking-wide underline-offset-2 after:inline-block after:whitespace-pre after:content-['_↗'] hover:underline"
				>Comments</a
			>
		</li>
		<li>
			<a
				href="https://news.ycombinator.com/favorites?id={data.id}"
				class="inline text-sm font-medium tracking-wide underline-offset-2 after:inline-block after:whitespace-pre after:content-['_↗'] hover:underline"
				>Favourites</a
			>
		</li>
	</ul>
</div>
