import { CollectionColors } from "@/lib/constants";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(4, {
    message: "o nome da coleção	deve conter 4 letras",
  }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionColors).includes(color)),
});

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;
