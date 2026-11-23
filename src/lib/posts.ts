import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function estimateReadingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date: Date, lang: 'en' | 'fr' = 'en'): string {
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatShortDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
