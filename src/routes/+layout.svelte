<script>
	import { page } from '$app/stores';
	import '../app.css';

	$: current = $page.url.pathname.split('/')[1];

	const categories = ['top', 'new', 'show', 'ask', 'jobs'];
</script>

<header class="px-3 sm:px-10">
	<nav
		aria-label="Primary navigation"
		class="mx-auto grid h-16 w-full max-w-5xl grid-cols-[128px,auto,128px] items-center gap-3 border-b"
	>
		<div class="flex items-center">
			<a href="/" class="inline-flex">
				<span class="sr-only">Slacker News</span>
				<img
					width="28"
					height="28"
					src="/favicon.png"
					alt="Slacker News logo featuring a lazy sloth with a folded newspaper hat"
				/>
			</a>
		</div>

		<ul class="flex items-center sm:justify-center">
			{#each categories as category}
				<li class="text-subtle">
					<a
						href="/{category}/1"
						aria-current={category === current ? 'page' : undefined}
						class="flex items-center justify-center px-3 py-1.5 text-sm font-medium capitalize tracking-wide hover:text-text aria-page:text-text"
						>{category}</a
					>
				</li>
			{/each}
		</ul>

		<div class="flex justify-self-end">
			<a
				href="https://news.ycombinator.com/submit"
				class="inline text-sm font-medium tracking-wide underline-offset-2 after:inline-block after:whitespace-pre after:content-['_↗'] hover:underline"
				>Submit</a
			>
		</div>
	</nav>
</header>

<main class="p-3 sm:p-10">
	<div class="mx-auto max-w-5xl">
		<slot />
	</div>
</main>
