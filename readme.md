# slacker-news

> Elegant news reader

## Data sources

Slacker News retrieves data from [HNPWA API](https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md) and uses [hnrss.org](https://hnrss.org) for realtime RSS feeds. Thanks to these services for allowing us to provide an alternative interface to Hacker News.

## Contributing

Pull requests are welcome and appreciated! We are using [SvelteKit](https://kit.svelte.dev) and [TailwindCSS](https://tailwindcss.com) for the frontend.

### Setup environment

Clone and fork this repository. Create new branch, e.g. `fix-loud-screeching-noise`. Then, install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

### Submit changes

Before committing, format your changes:

```sh
pnpm format
```

Next, create a pull request with a title that follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)—see our other pull requests for examples.
