import { CustomMDX } from "@/app/components/mdx";
import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "../utils";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Blog({ params }) {
  const { slug: paramsSlug } = await params;

  const post = await getBlogPosts().find((post) => post.slug === paramsSlug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            // image: post.metadata.image
            //   ? `${baseUrl}${post.metadata.image}`
            //   : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            // url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        {/* problema tá aqui */}
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
