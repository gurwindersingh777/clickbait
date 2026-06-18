import { z } from "zod"

export const generateSchema = z.object({
  preset: z.string().min(1, "Please select a style preset"),
  prompt: z.string()
    .min(10, "Prompt must be at least 10 characters")
    .max(500, "Prompt must be under 500 characters"),
  aspectRatio: z.string().min(1, "Please select an aspect ratio"),
  quality: z.string().min(1, "Please select a quality"),
})

export type GenerateFormValues = z.infer<typeof generateSchema>