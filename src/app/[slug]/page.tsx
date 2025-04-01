import React from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { toPlainText } from '@portabletext/react';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };


export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const metaImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(200).height(113).url()
    : null;
  
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;
  

  return (
    <React.Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${toPlainText(post.body).substring(0, 75)}...`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={`${toPlainText(post.body).substring(0, 75)}...`} />
        { metaImageUrl && <meta property="og:image" content={metaImageUrl} /> }
      </Head>
      <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4"  style={{flex: 1}}>
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width={550}
            height={310}
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose">
          <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </main>
    </React.Fragment>
  );
}