export const dynamic = "force-static";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
export default async function Posts() {
  const session = await auth();
  if (!session?.user) return <div>WHo r u?</div>;

  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        <li>My first post</li>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <span className="font-semibold">{post.title}</span>
              <span className="text-sm text-gray-600 ml-2">
                by {post.author.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
