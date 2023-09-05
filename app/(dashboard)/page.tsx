import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
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
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Seja bem-vindo, <br /> {user.firstName} {user.lastName}{" "}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="mb-12">
      <div className="loader"></div>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>Ainda não há coleções!</AlertTitle>
          <AlertDescription>
            Crie uma nova sessão para começar!
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }
  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
