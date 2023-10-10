/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/types').Item>}
 */
export async function load({ params, fetch, url }) {
	const res = await fetch(`https://api.hnpwa.com/v0/item/${params.id}.json`);
	return {
		...(await res.json()),
		root_id: url.searchParams.get('rootId'),
	};
}
