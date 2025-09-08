import React from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client, urlForImage } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

import { PortableTextReactComponents, toPlainText } from '@portabletext/react';
import ArticleBodyImage from "../ArticleBodyImage";

const blogPostComponents = {
  types: {
    image: ({value}) => {
      return (
        <ArticleBodyImage
          imgIndex={value.asset.index}
          imgUrl={value.asset.url}
          blurImg={value.asset.blurImg}
        />
      )
    },
  },
} as Partial<PortableTextReactComponents>

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export async function  generateMetadata({ params }: { params: Promise<{ slug: string }> } ) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const metaImageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(200).height(113).url()
    : null;
  
  const metadata = {
    title: post.title,
    description: toPlainText(post.body).substring(0, 75),
    openGraph: {
      title: post.title,
      description: toPlainText(post.body).substring(0, 75),
      siteName: "Bloggin' with Pandas",
      images: [] as { url: string; width: number; height: number; alt: string }[] // Initialize images with explicit type
    }
  }

  if ( metaImageUrl ) {
    metadata.openGraph.images.push({
      url: metaImageUrl,
      width: 200,
      height: 113,
      alt: post.title
    });
  }

  return metadata
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const mainImageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(550).height(310).url()
    : null;
  
  let imgCount: number = 0
  await Promise.all(
    post.body.map(async (block: {
      asset: any; _type: unknown; 
}, index: number) => {
      console.log('bodyody', block)
      if (block._type === `image`) {
        imgCount++
        const embeddedImage = await client.fetch(`*[_type == "sanity.imageAsset" && _id == $ref][0]{
            metadata,
            url
        }`, { ref: block.asset._ref}) as {
          metadata: {
            lqip: string
          },
          url: string
        }

        post.body[index] = {
          ...block,
          asset: {
            index: imgCount,
            url: embeddedImage.url,
            blurImg: embeddedImage.metadata.lqip
          }
        }
      } else {
        post.body[index] = block
      }
    })
  )

  // console.log('body', post.body)
  return (
      <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4"  style={{flex: 1}}>
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        { mainImageUrl && 
          <Image
            src={mainImageUrl}
            height={0}
            width={0}
            sizes="100vw"
            alt={post.title}
            style={{width: `100%`, height: `auto`}}
          />
          // <img src={mainImageUrl} alt={post.title} />
        }
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose">
          <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          {Array.isArray(post.body) && <PortableText value={post.body} components={blogPostComponents}/>}
        </div>
      </main>
  );
}