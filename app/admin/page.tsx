export const dynamic = "force-static";
import { auth } from "@/auth";
import { SignOut } from "@/components/signout-button";

export default async function Home() {
  const session = await auth();
  if (session?.user) return <div>WHo r u?</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        AD MI N
      </h1>

      <SignOut />
    </div>
  );
}
