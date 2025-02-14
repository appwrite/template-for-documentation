import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
	const docs = await getCollection('docs');

	const searchIndex = await Promise.all(
		docs.map(async (entry: CollectionEntry<'docs'>) => {
			// Get rendered content
			const { remarkPluginFrontmatter } = await entry.render();

			return {
				title: entry.data.title,
				description: entry.data.description,
				group: entry.data.group,
				category: entry.data.category,
				slug: `/${entry.slug}`,
				// Add headings from remarkPluginFrontmatter for better search
				headings: remarkPluginFrontmatter.headings?.map((h: any) => h.text) || []
			};
		})
	);

	return new Response(JSON.stringify(searchIndex), {
		headers: {
			'Content-Type': 'application/json',
			// Add cache headers
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
