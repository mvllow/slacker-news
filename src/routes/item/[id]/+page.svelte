<script>
	import { browser } from '$app/environment';
	import Comment from './comment.svelte';
	import Content from '$lib/content.svelte';
	import Capsule from '$lib/capsule.svelte';
	import {
		ArrowCircleIcon,
		BookmarkIcon,
		ChatBubbleIcon,
		UserCircleIcon,
	} from '$lib/icons';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let saved = false;

	$: replyLink =
		data.type === 'comment'
			? `https://news.ycombinator.com/reply?id=${data.id}&goto=item%3Fid%3D${data.root_id}%23${data.id}`
			: `https://news.ycombinator.com/item?id=${data.id}`;

	onMount(() => {
		saved = !!getSavedArticles()[data.id];
	});

	function getSavedArticles() {
		const savedArticles = JSON.parse(localStorage.getItem('articles') ?? '{}');
		return savedArticles;
	}

	function favoriteArticle() {
		if (browser) {
			const savedArticles = getSavedArticles();
			if (!!savedArticles[data.id]) {
				savedArticles[data.id] = undefined;
				saved = false;
			} else {
				console.log(data.title);
				savedArticles[data.id] = data.title;
				saved = true;
			}
			localStorage.setItem('articles', JSON.stringify(savedArticles));
		}
	}
</script>

<svelte:head>
	<title
		>{data.title ? data.title : `Comment by ${data.user}`} • Slacker News</title
	>
	<meta
		name="description"
		content={data.title
			? `Hacker News discussion about "${data.title}"`
			: `Hacker News discussion comments`}
	/>
</svelte:head>

<div>
	<article class="mx-auto max-w-prose">
		{#if data.type === 'comment' && data.root_id}
			<a
				href="/item/{data.root_id}#{data.id}"
				class="mb-6 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-subtle hover:text-text"
				>&larr; Back to context</a
			>
		{/if}

		<h1>
			<a
				href={data.domain ? data.url : `/item/${data.id}`}
				class="break-long-words text-lg font-bold underline-offset-2 hover:underline"
				>{data.type === 'comment' ? `Comment by ${data.user}` : data.title}</a
			>
		</h1>

		<p class="mt-1.5 flex cursor-default select-none items-center gap-1.5">
			<span class="flex shrink-0 items-center text-xs font-medium text-subtle">
				{data.time_ago.replace(/(a|an)\W.*?/, '1 ')}
			</span>

			{#if data.domain}
				<span
					class="inline-flex items-center break-all font-mono text-xs font-medium text-subtle"
					>({data.domain})
				</span>
			{/if}
		</p>

		{#if data.content}
			<Content content={data.content} />
		{/if}

		<div class="mt-6 flex flex-wrap items-center gap-3">
			<Capsule href="#comments" ignoreVisited>
				<ChatBubbleIcon size={16} />

				<p>
					{data.comments_count}
					{data.comments_count === 1 ? 'comment' : 'comments'}
				</p>
			</Capsule>

			{#if data.user}
				<Capsule href="/user/{data.user}">
					<UserCircleIcon size={16} />

					<p>{data.user}</p>
				</Capsule>
			{/if}

			<Capsule href={replyLink} ignoreVisited>
				<ArrowCircleIcon size={16} />

				<p>Reply</p>
			</Capsule>

			{#if data.title}
				<button
					on:click={favoriteArticle}
					class="flex h-8 w-8 items-center justify-center gap-1.5 rounded-full bg-surface text-sm hover:bg-overlay {saved
						? '[&>svg]:fill-current'
						: ''}"
					title={saved ? 'Remove from library' : 'Add to library'}
				>
					<span class="sr-only"
						>{saved ? 'Remove from library' : 'Add to library'}</span
					>
					<BookmarkIcon size={16} />
				</button>
			{/if}
		</div>

		<div class="h-6 w-full border-b" />

		<div id="comments">
			{#if data.comments.length > 0}
				{#each data.comments as comment}
					<Comment
						author={data.user ?? ''}
						rootId={data.root_id ?? data.id}
						{comment}
					/>
				{/each}
			{:else}
				<div
					class="mt-6 flex flex-wrap items-center justify-between gap-6 rounded-xl border p-6"
				>
					<p class="font-semibold">No comments yet</p>
					<Capsule href={replyLink}
						>Contribute on Hacker News&nbsp;&nearr;</Capsule
					>
				</div>
			{/if}
		</div>
	</article>
</div>
