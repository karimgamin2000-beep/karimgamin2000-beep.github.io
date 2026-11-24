import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { generateOgPng } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<'posts'>;
  const png = await generateOgPng({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    lang: post.data.lang,
    tags: post.data.tags,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
