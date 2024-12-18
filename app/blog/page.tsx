import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";
import BlurFade from "app/components/ui/blur-fade";
import { AnimatedName } from "@/components/animated-name";
import Blog from "@/components/blog";
export const metadata = {
  title: "Blog",
  description: "Thien's ",
};



export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <Blog/>
  );
}
