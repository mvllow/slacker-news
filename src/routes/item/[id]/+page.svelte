<script>
	import Comment from './comment.svelte';
	import Capsule from '$lib/capsule.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// TODO: Back link to category/1#itemId
	$: backLink = data.from ? `/item/${data.from}#${data.id}` : '';
	$: replyLink = data.from
		? `https://news.ycombinator.com/reply?id=${data.id}&goto=item%3Fid%3D${data.from}%23${data.id}`
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
				class="inline-flex items-center bg-primary/10 text-primary"
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4 text-subtle"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
					/>
				</svg>

				<p>
					{data.comments_count}
					{data.comments_count === 1 ? 'comment' : 'comments'}
				</p>
			</Capsule>

			{#if data.user}
				<Capsule href="/user/{data.user}">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4 text-subtle"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>

					<p>{data.user}</p>
				</Capsule>
			{/if}

			<Capsule href={replyLink} ignoreVisited>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4 -rotate-45 text-subtle"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>

				<p>Reply</p>
			</Capsule>
		</div>

		<div class="h-6 w-full border-b" />

		<div id="comments">
			{#each data.comments as comment}
				<Comment author={data.user} parentId={data.id} {comment} />
			{/each}
		</div>
	</article>
</div>
