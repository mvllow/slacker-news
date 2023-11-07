<script>
	import { page } from '$app/stores';
	import { BookmarkIcon } from '$lib/icons';
	import '../app.css';

	$: current = $page.url.pathname.split('/')[1];

	const categories = ['top', 'new', 'show', 'ask', 'jobs'];
</script>

<div class="grid min-h-screen grid-rows-[auto,1fr,auto]">
	<header class="border-b px-page-gutter">
		<nav
			aria-label="Primary navigation"
			class="mx-auto grid max-w-shell grid-cols-2 grid-rows-2 items-center justify-between gap-6 py-3 sm:grid-cols-[128px,auto,128px] sm:grid-rows-1"
		>
			<div class="flex items-center">
				<a href="/" class="inline-flex shrink-0">
					<span class="sr-only">Slacker News</span>
					<img
						width="24"
						height="24"
						src="/favicon.png"
						alt="Slacker News logo featuring a lazy sloth with a folded newspaper hat"
					/>
				</a>
			</div>

			<ul class="row-start-2 flex items-center gap-5 sm:row-start-auto">
				{#each categories as category}
					<li>
						<a
							href="/{category}/1"
							aria-current={category === current ? 'page' : undefined}
							class="nav-link capitalize">{category}</a
						>
					</li>
				{/each}
			</ul>

			<div class="flex items-center justify-self-end">
				<a href="/library" class="nav-link">
					<BookmarkIcon size={16} thickness={2} />
					<span>Library</span>
				</a>
			</div>
		</nav>
	</header>

	<main class="p-page-gutter">
		<div class="mx-auto max-w-content">
			<slot />
		</div>
	</main>

	<footer class="mt-20 border-t p-page-gutter">
		<div
			class="mx-auto grid max-w-content grid-cols-1 gap-6 overflow-x-auto sm:grid-cols-3"
		>
			<div>
				<p class="font-serif text-sm font-semibold italic">Slacker News</p>
			</div>

			<div>
				<h2 class="text-sm font-semibold">Product</h2>
				<ul role="list" class="mt-3">
					<li>
						<a
							href="https://github.com/tastejs/hacker-news-pwas"
							class="nav-link">API Reference</a
						>
					</li>
					<li>
						<a href="https://hnrss.github.io" class="nav-link"
							>Hacker News RSS</a
						>
					</li>
					<li>
						<a href="https://github.com/mvllow/slacker-news" class="nav-link"
							>Source on GitHub</a
						>
					</li>
				</ul>
			</div>

			<div>
				<h2 class="text-sm font-semibold">Community</h2>
				<ul role="list" class="mt-3">
					<li>
						<a
							href="https://heavy.com/news/help-ukraine-verified-charities-aid-relief-gofundme/"
							class="nav-link">Support Ukraine</a
						>
					</li>
					<li>
						<a href="https://eji.org/" class="nav-link"
							>Equal Justice Initiative</a
						>
					</li>
					<li>
						<a href="https://www.givewell.org" class="nav-link"
							>GiveWell Charities</a
						>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</div>

<style lang="postcss">
	.nav-link {
		@apply flex items-center gap-1.5 rounded-full text-sm font-medium leading-loose text-subtle hover:text-text aria-page:text-text;
	}
	.nav-link[href^='http'] {
		@apply whitespace-nowrap after:-ml-1 after:inline-block after:whitespace-pre after:pb-1 after:align-super after:text-[10px] after:text-muted after:content-['_↗'] hover:after:text-subtle;
	}
</style>
