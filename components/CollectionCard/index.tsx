"use client";
import { Collection, Task } from "@prisma/client";
import React, { useMemo, useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import {
  CaretDownIcon,
  CaretUpIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "../CreateTaskDialog";
import TaskCard from "../TaskCard";

interface CollectionCardProps {
  collection: Collection & {
    tasks: Task[];
  };
}

function CollectionCard({ collection }: CollectionCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const tasks = collection.tasks;

  const [isLoading, startTransition] = useTransition();
  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Success",
        description: "Coleção deletada com sucesso!",
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Erro, Coleção não deletada",
        variant: "destructive",
      });
    }
  };
  const taskDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);
  const totalTask = collection.tasks.length;

  const progress =
    collection.tasks.length === 0 ? 0 : (taskDone / totalTask) * 100;
  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {collection.tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>Aqui não tem tarefas</p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Crie uma!
              </span>
            </Button>
          )}
          {collection.tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center ">
            <p>Criado em {collection.createdAt.toLocaleDateString("pt-BR")}</p>
            {isLoading && <div>Deletando...</div>}
            {!isLoading && (
              <div>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => {
                    setShowCreateModal(true);
                  }}
                >
                  <PlusCircledIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Voce tem certeza ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não há volta, essa ação excluira sua coleção e
                      todas as tarefas.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection);
                        }}
                      >
                        Apagar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default CollectionCard;
