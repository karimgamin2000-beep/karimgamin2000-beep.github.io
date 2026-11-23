---
title: "Why I Started a Minimal, Modern Engineering Blog"
description: "Combining Karpathy-style distraction-free technical writing with modern developer ergonomics using Astro, Tailwind, and GitHub Pages."
pubDate: 2026-11-23
lang: "en"
tags: ["meta", "ai-engineering", "astro"]
featured: true
---

Most personal tech blogs fall into one of two traps: either they look like unstyled HTML from 2008, or they ship megabytes of JavaScript just to render a few paragraphs of text.

I wanted something in between:

- **Andrej Karpathy's clarity**: text-first, single-column, fast, and focused on ideas rather than visual noise.
- **Modern developer polish** (inspired by [Codelynx](https://codelynx.dev)): crisp typography, dark mode by default, syntax-highlighted code blocks, and effortless navigation.

## Architecture Choices

This site is built with **Astro** + **Tailwind CSS** + **MDX** and deployed statically to **GitHub Pages** via GitHub Actions.

```ts
// Zero client-side framework overhead:
// Markdown -> Static HTML + Shiki syntax highlighting at build time
export const stack = {
  framework: 'Astro',
  styling: 'Tailwind CSS v4',
  content: 'Markdown / MDX',
  hosting: 'GitHub Pages',
};
```

### Why Static-First Matters

1. **Speed**: Pages are pre-rendered HTML with near-zero JavaScript.
2. **Longevity**: Every article is just a `.md` or `.mdx` file in `src/content/posts/`.
3. **Focus**: Writing is as simple as opening a Markdown file, committing, and pushing to `main`.

## What Comes Next

I will be publishing field notes in both **English** and **French** covering AI agent workflows, data pipelines, Python & TypeScript tooling, and my journey from Computer Science student to AI & Robotics Engineer.
