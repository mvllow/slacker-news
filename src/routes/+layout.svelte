<script>
	import { page } from '$app/stores';
	import '../app.css';

	$: current = $page.url.pathname.split('/')[1];

	const categories = ['top', 'new', 'show', 'ask', 'jobs'];
</script>

<div class="grid min-h-screen grid-rows-[auto,1fr,auto]">
	<header class="border-b px-page-gutter">
		<nav
			aria-label="Primary navigation"
			class="mx-auto grid max-w-shell grid-cols-2 grid-rows-2 items-center justify-between gap-3 py-page-gutter sm:grid-cols-[128px,auto,128px] sm:grid-rows-1"
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

			<ul
				class="row-start-2 -ml-3 flex items-center sm:row-start-auto sm:ml-0 sm:justify-center"
			>
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
					class="inline whitespace-nowrap text-sm font-medium tracking-wide underline-offset-2 after:inline-block after:whitespace-pre after:content-['_↗'] hover:underline"
					>Submit</a
				>
			</div>
		</nav>
	</header>

	<main class="p-page-gutter">
		<div class="mx-auto max-w-content">
			<slot />
		</div>
	</main>

	<footer class="border-t p-page-gutter">
		<div
			class="mx-auto grid max-w-content grid-cols-1 gap-6 overflow-x-auto sm:grid-cols-3"
		>
			<div>
				<p class="font-bold">Slacker News</p>
			</div>

			<div>
				<h2 class="font-medium">Product</h2>
				<ul
					role="list"
					class="mt-3 [&>li]:leading-loose [&_a:hover]:text-text [&_a]:text-subtle"
				>
					<li>
						<a href="https://github.com/tastejs/hacker-news-pwas"
							>API Reference</a
						>
					</li>
					<li>
						<a href="https://github.com/mvllow/slacker-news">Source on GitHub</a
						>
					</li>
				</ul>
			</div>

			<div>
				<h2 class="font-medium">Get Involved</h2>
				<ul
					role="list"
					class="mt-3 [&>li]:leading-loose [&_a:hover]:text-text [&_a]:text-subtle"
				>
					<li>
						<a
							href="https://heavy.com/news/help-ukraine-verified-charities-aid-relief-gofundme/"
							>Support Ukraine</a
						>
					</li>
					<li><a href="https://eji.org/">Equal Justice Initiative</a></li>
					<li><a href="https://www.givewell.org">GiveWell Charities</a></li>
				</ul>
			</div>
		</div>
	</footer>
</div>
