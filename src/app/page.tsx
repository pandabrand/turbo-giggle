import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client, urlForImage } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, mainImage, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto max-w-3xl p-8" style={{flex: 1}}>
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => {
            const imgUrl = post.mainImage
              ? urlForImage(post.mainImage)?.width(200).quality(100).url()
              : null;
            
          
          // const imgUrl = urlForImage(post.mainImage).width(200).quality(100).url()
          return (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              { imgUrl &&
                <img src={imgUrl} alt={post.title} />
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