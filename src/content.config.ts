import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Define groups in desired order
export const groups = ['Overview', 'Foundations', 'Components'] as const;

const docs = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/docs' }),
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
