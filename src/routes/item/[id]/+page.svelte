<script>
	import Comment from './comment.svelte';
	import Capsule from '$lib/capsule.svelte';
	import { ChatBubbleIcon, UserCircleIcon, ArrowCircleIcon } from '$lib/icons';

	/** @type {import('./$types').PageData} */
	export let data;

	$: backLink =
		data.type === 'comment'
			? data.parentId &&
			  `/item/${data.parentId}?origin=${data.origin}#${data.id}`
			: data.origin && `/${data.origin}#${data.id}`;

	$: replyLink =
		data.type === 'comment'
			? `https://news.ycombinator.com/reply?id=${data.id}&goto=item%3Fid%3D${data.parentId}%23${data.id}`
			: `https://news.ycombinator.com/item?id=${data.id}`;
</script>

<svelte:head>
	<!-- Fix data.title on comment types (pass title of OG post?) -->
	<title>{data.title} | Slacker News</title>
	<meta
		name="description"
		content="Hacker News discussion about {data.title}"
	/>
</svelte:head>

<div>
	<article class="mx-auto max-w-prose">
		{#if backLink}
			<a
				href={backLink}
				class="mb-6 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-subtle hover:text-text"
				>&larr; Back to context</a
			>
		{/if}

		<h1>
			<a
				href={data.domain ? data.url : `/item/${data.id}`}
				class="text-lg font-bold"
				>{data.type === 'comment' ? `Comment by ${data.user}` : data.title}</a
			>
		</h1>

		<p class="mt-1.5 flex cursor-default select-none items-center gap-1.5">
			<time class="flex items-center text-xs font-medium text-subtle">
				{data.time_ago.replace(/(a|an)\W.*?/, '1 ')}
			</time>

			{#if data.domain}
				<span
					class="inline-flex items-center font-mono text-xs font-medium text-subtle"
					>({data.domain})
				</span>
			{/if}
		</p>

		{#if data.content}
			<div class="formatted-content">
				{@html data.content}
			</div>
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
		</div>

		<div class="h-6 w-full border-b" />

		<div id="comments">
			{#each data.comments as comment}
				<Comment
					author={data.user}
					parentId={data.parentId ?? data.id}
					origin={data.origin}
					{comment}
				/>
			{/each}
		</div>
	</article>
</div>
