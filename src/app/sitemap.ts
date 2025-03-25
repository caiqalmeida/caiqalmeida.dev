import { getBlogPosts } from "./blog/utils";

// TO DO : put buyed domain
// export const baseUrl = "https://caiqalmeida.vercel.app";
export const baseUrl = "http:/localhost:3000";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // TO DO: map all routes
  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
