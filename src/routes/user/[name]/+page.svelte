<script>
	import Capsule from '$lib/capsule.svelte';
	import Content from '$lib/content.svelte';
	import {
		ChatBubbleIcon,
		DocumentTextIcon,
		HeartIcon,
		RssIcon,
	} from '$lib/icons';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @param {string} text */
	function linkify(text) {
		// Modified linkify regex:
		// - replaced "\/" with "&#x2F;"
		// - removed ftp and file detection
		// https://stackoverflow.com/a/8943487
		const urlRegex =
			/(\b(https?):&#x2F;&#x2F;[-A-Z0-9+&@#&#x2F;%?=~_|!:,.;]*[-A-Z0-9+&@#&#x2F;%=~_|])/gi;
		return text.replace(urlRegex, function (url) {
			return '<a href="' + url + '">' + url + '</a>';
		});
	}
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

			<Capsule href="https://hnrss.org/user?id={data.id}">
				<RssIcon size={16} />
				<p>Follow via RSS</p>
			</Capsule>
		</div>
	</div>

	<div>
		<h2 class="font-semibold">About</h2>

		{#if data.about}
			<Content content={'<p>' + linkify(data.about)} />
		{:else}
			<p class="font-serif italic">No information</p>
		{/if}
	</div>
</div>
