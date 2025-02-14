# Modern Documentation Template

A sleek and modern documentation site template built with Astro, Svelte, and Tailwind CSS. Features a clean design, full-text search, dark mode support, and responsive layout.

## Features

- 🚀 **Built with Astro** - Fast, modern static site generation
- ⚡️ **Svelte Components** - Interactive UI components with great DX
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔍 **MDX Support** - Write content in MDX with component support
- 🔍 **Full-text Search** - Fast client-side search with Fuse.js
- 🌙 **Dark Mode** - Elegant light and dark theme support
- 📱 **Responsive Design** - Mobile-first, adaptive layout
- 🧩 **Auto-generated Navigation** - Sidebar structure from content
- 🎯 **Priority-based Ordering** - Fine-grained control over navigation order
- 📚 **Group Ordering** - Define navigation group order in config

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ebenezerdon/docs-template.git

# Navigate to the project
cd docs-template

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Adding Content

### Content Files

Add your documentation content in MDX format under `src/content/docs/`:

```md
---
title: Getting Started
description: Learn how to use our product
group: Overview
priority: 2
---

# Getting Started

Welcome to our documentation...
```

### Navigation Structure

The sidebar navigation is automatically generated from your content structure. The order of navigation groups is defined in `src/content/config.ts`:

```typescript
// Define groups in desired order
const groups = ['Overview', 'Foundations', 'Components'] as const;

const docs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		group: z.enum(groups).optional(), // Groups will appear in the order defined above
		order: z.number().optional(),
		priority: z.number().optional()
	})
});
```

Each MDX file can include these frontmatter fields:

| Field         | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `title`       | string | Yes      | Page title                                     |
| `description` | string | Yes      | Page description                               |
| `group`       | enum   | No       | Navigation group (must match config.ts groups) |
| `priority`    | number | No       | Navigation order priority (higher = earlier)   |

### Navigation Priority

The `priority` field gives you fine-grained control over page order within groups:

```md
---
title: Home
group: Overview
priority: 1 # Appears first
---

---

title: Getting Started
group: Overview
priority: 2 # Appears second

---

---

title: Design Tokens
group: Overview
priority: 3 # Appears third

---
```

If `priority` is not set, items are sorted alphabetically by title.

### Group Order

Groups appear in the order they're defined in `config.ts`. To change the order of navigation groups:

1. Update the `groups` array in `src/content/config.ts`
2. The sidebar will automatically reflect the new order
3. TypeScript ensures group names in MDX files match the config

## Customization

### Theme

Customize colors, typography, and other design tokens in `tailwind.config.mjs`:

```js
theme: {
	extend: {
		colors: {
			primary: {
				// Your color palette
			}
		}
	}
}
```

### Components

Add or modify components in `src/components/`. The template uses Svelte for interactive components and Astro for page layout.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT License - feel free to use this template for your own documentation needs.
