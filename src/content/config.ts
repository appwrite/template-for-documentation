import { defineCollection, z } from 'astro:content';

// Define groups in desired order
export const groups = ['Introduction', 'Setup', 'Ad Formats', 'Usage', 'API Reference'] as const;

const docs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		group: z.enum(groups).optional(),
		priority: z.number().optional()
	})
});

export const collections = {
	docs
};
