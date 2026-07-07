import { getCollection } from "astro:content";

const PAGE_SIZE = 20;

export async function GET({ url }: { url: URL }) {
	const allEssays = await getCollection("essays");

	const published = allEssays
		.filter((e) => !e.data.draft)
		.sort(
			(a, b) =>
				b.data.published.getTime() - a.data.published.getTime(),
		);

	const offset = Number.parseInt(url.searchParams.get("offset") || "0");
	const page = published.slice(offset, offset + PAGE_SIZE);

	const items = page.map((essay) => ({
		id: essay.id,
		title: essay.data.title,
		description: essay.data.description,
		published: essay.data.published.toISOString(),
		// Extract year/month for grouping key
		year: essay.data.published.getFullYear(),
		month: essay.data.published.getMonth(),
	}));

	return new Response(
		JSON.stringify({
			items,
			hasMore: offset + PAGE_SIZE < published.length,
			nextOffset: offset + PAGE_SIZE,
		}),
	);
}
