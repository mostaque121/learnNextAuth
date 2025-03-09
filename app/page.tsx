export const dynamic = "force-static";

import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/signout-button";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const users = await prisma.user.findMany();
  console.log(session);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog haha
      </h1>
      <form
        action={async () => {
          "use server";
          revalidatePath("/");
        }}
      >
        <button type="submit">Revalidate</button>
      </form>
      <h2>name : {session?.user.name}</h2>
      <div>
        <Link href={"/posts"}>posts</Link>
      </div>
      <div>
        <Link href={"/new"}>Create</Link>
      </div>
      <div>{session?.user ? <SignOut /> : <SignIn />}</div>

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
