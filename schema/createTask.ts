import { z } from "zod";

export const createTaskSchema = z.object({
  collectionId: z.number().nonnegative(),
  content: z.string().min(8, {
    message: "A task deve conter pelo menos 8 caracteres",
  }),
  expiresAt: z.date().optional(),
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>