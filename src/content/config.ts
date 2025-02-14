import { defineCollection, z } from 'astro:content';

// Define groups in desired order
export const groups = ['Overview', 'Foundations', 'Components'] as const;

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
