import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, mainImage, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

    export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto max-w-3xl p-8" style={{flex: 1}}>
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => {
            const postImageUrl = post.mainImage
            ? urlFor(post.mainImage)?.width(200).height(113).url()
            : null;
          return (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              { postImageUrl && 
                <Image
                  src={postImageUrl}
                  alt={post.title}
                  className="rounded-xl"
                  width={200}
                  height={113}
                />
              }
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        )})}
      </ul>
    </main>
  );
}