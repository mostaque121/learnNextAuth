export const dynamic = "force-static";
import Link from "next/link";

import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/signout-button";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const users = await prisma.user.findMany();
  if (!session?.user)
    return (
      <div>
        <SignIn />
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <h2>name : {session.user.name}</h2>
      <div>
        <Link href={"/posts"}>posts</Link>
      </div>
      <div>
        <Link href={"/new"}>Create</Link>
      </div>
      <SignOut />
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
