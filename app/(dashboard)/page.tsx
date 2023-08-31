import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();
  await wait(2000);
  if (!user) {
    return <div>Error</div>;
  }
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Seja bem-vindo, {user.firstName} {user.lastName}{" "}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return <div className="loader">s</div>;
}
