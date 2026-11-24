import type { APIRoute } from 'astro';
import { generateOgPng } from '../../lib/og';

export const GET: APIRoute = async () => {
  const png = await generateOgPng({
    title: 'KAK — AI Engineering & Developer Tools',
    description: 'Technical notes on artificial intelligence, autonomous agents, software architecture, and modern tools for building faster.',
    category: 'BLOG',
    lang: 'EN / FR',
    tags: ['software-factory', 'ai-agents', 'architecture', 'dev-tools'],
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
