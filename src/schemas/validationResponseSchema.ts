import { z } from "zod"

export const validationResponseSchema = z.object({
  isValid: z.boolean(),
  reason: z.string(),
  improvedPrompt: z.string(),
  titles: z.array(z.string()).length(3),
})

export type ValidationResponse = z.infer<typeof validationResponseSchema>