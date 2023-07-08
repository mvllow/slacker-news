<script>
	import Capsule from '$lib/capsule.svelte';

	/** @type {{ id: number, domain: string, url: string, user: string, title: string, time_ago: string, points: number, comments_count: number }} */
	export let item;
	export let index;
</script>

<article class="py-6 first:pt-0">
	<h2 class="max-w-lg">
		<a
			href={item.domain ? item.url : `/item/${item.id}`}
			class="text-lg font-bold visited:text-subtle">{item.title}</a
		>
	</h2>

	<p class="mt-1.5 flex cursor-default select-none items-center gap-1.5">
		<time class="flex items-center text-xs font-medium text-subtle">
			{item.time_ago.replace(/(a|an)\W.*?/, '1 ')}
		</time>

		{#if item.domain}
			<span
				class="inline-flex items-center font-mono text-xs font-medium text-subtle"
				>({item.domain})
			</span>
		{/if}
	</p>

	<div class="mt-3 flex flex-wrap items-center gap-1.5">
		<Capsule href="/item/{item.id}">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-4 w-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
				/>
			</svg>

			<p>
				{item.comments_count}
				{item.comments_count === 1 ? 'comment' : 'comments'}
			</p>
		</Capsule>
	</div>
</article>
