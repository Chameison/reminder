import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

type ContainerSideProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
function ContainerSide({ open, onOpenChange }: ContainerSideProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicione nova categoria</SheetTitle>
          <SheetDescription>As coleções são categorias/grupos de suas tarefas</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ContainerSide;
