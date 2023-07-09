/**
 * @typedef {object} HNewsAPIDetails
 * @property {string} topic
 */

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const list =
		params.list === 'top'
			? 'news'
			: params.list === 'new'
			? 'newest'
			: params.list;

	const apiDetails$ = fetch(`https://api.hnpwa.com/v0`).then(toJson);

	const items$ = fetch(
		`https://api.hnpwa.com/v0/${list}/${params.page}.json`
	).then(toJson);

	const [apiDetails, items] = await Promise.all([apiDetails$, items$]);
	const listDetails = apiDetails.endpoints.find(
		/**
		 *
		 * @param {HNewsAPIDetails} x
		 * @returns
		 */
		(x) => x.topic === list
	);

	return {
		list: params.list,
		page: Number(params.page),
		maxPages: Number(listDetails.maxPages),
		items,
	};
}

/**
 * @param {{json:()=>Promise<any>}} x
 * @returns
 */
const toJson = (x) => x.json();
