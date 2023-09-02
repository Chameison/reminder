"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import ContainerSide from "../ContainerSide";

function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  console.log(open)
  console.log(handleOpenChange)
  return (
    
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
      <Button
        variant={"outline"}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        onClick={()=>setOpen(true)}
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
          Criar categoria
        </span>
      </Button>
      <ContainerSide open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}

export default CreateCollectionBtn;
