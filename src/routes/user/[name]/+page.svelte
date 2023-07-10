<script>
	import Capsule from '$lib/capsule.svelte';
	import { ChatBubbleIcon, DocumentTextIcon, HeartIcon } from '$lib/icons';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.id} | Slacker News</title>
	<meta name="description" content="Hacker News user profile for {data.id}" />
</svelte:head>

<h1 class="sr-only">{data.id}</h1>

<div class="space-y-6">
	<div>
		<p class="text-lg font-bold sm:text-3xl sm:tracking-tight">
			{data.id}
		</p>

		<p class="mt-1.5 text-sm text-subtle">
			Joined {data.created}, with {data.karma} karma
		</p>

		<div class="mt-6 flex flex-wrap items-center gap-1.5">
			<Capsule href="https://news.ycombinator.com/submitted?id={data.id}">
				<DocumentTextIcon size={16} />
				<p>Submissions</p>
			</Capsule>

			<Capsule href="https://news.ycombinator.com/threads?id={data.id}">
				<ChatBubbleIcon size={16} />
				<p>Comments</p>
			</Capsule>

			<Capsule href="https://news.ycombinator.com/submitted?id={data.id}">
				<HeartIcon size={16} />
				<p>Favorites</p>
			</Capsule>
		</div>
	</div>

	{#if data.about}
		<div class="space-y-1.5">
			<h2 class="font-semibold">About</h2>

			{@html '<p>' + data.about}
		</div>
	{/if}
</div>
