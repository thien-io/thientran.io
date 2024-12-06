import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";
import BlurFade from "app/components/ui/blur-fade";

export const metadata = {
  title: "Blog",
  description: "Thien's ",
};

const BLUR_FADE_DELAY = 0.09;

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      </BlurFade>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <BlurFade delay={BLUR_FADE_DELAY * 4 + 0.05} >
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <p className="text-black dark:text-white tracking-tight">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </Link>
            </BlurFade>
          ))}
      </div>
    </section>
  );
}
