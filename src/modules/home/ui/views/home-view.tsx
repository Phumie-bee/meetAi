"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return <div>Loading...</div>;
  }
  //   const handleClick = () => {
  //     authClient.signOut({
  //       fetchOptions: {
  //         onSuccess: () => {
  //           router.push("/sign-in");
  //         },
  //       },
  //     });
  //   };

  return (
    <div className="flex flex-col gap-y-3 mx-5 mt-5">
      <p>Logged in as {session.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in");
              },
            },
          })
        }
        className="bg-gray-800 text-white p-2 rounded-xl"
      >
        Sign Out
      </Button>
    </div>
  );
};
