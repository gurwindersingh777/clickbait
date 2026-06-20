import { PRESETS } from "@/constants/presets"
import { ai } from "../gemini"
import { validationResponseSchema } from "@/schemas/validationResponseSchema"

const SYSTEM_PROMPT = `
You are a YouTube thumbnail prompt validator.
Determine whether the prompt contains enough visual detail to generate a compelling thumbnail.
Return ONLY valid JSON — no markdown, no code fences.

Format:
{
  "isValid": true,
  "reason": "",
  "improvedPrompt": "",
  "titles": ["", "", ""]
}

Rules:
- titles must contain exactly 3 items
- improvedPrompt should be optimized for AI image generation
- if invalid, explain why in reason
- if valid, reason should be empty

Reject prompts that are too vague, not visual, or under 5 descriptive words.
`

export async function validatePrompt(preset: string, prompt: string) {
  const presetConfig = PRESETS[preset as keyof typeof PRESETS]

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: { systemInstruction: SYSTEM_PROMPT },
    contents: `
      Preset: ${presetConfig.label}
      Style: ${presetConfig.aiStyle}
      User Prompt: ${prompt}
      `
  })

  if (!response.text) throw new Error("Empty AI response")

  const cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  const result = validationResponseSchema.safeParse(JSON.parse(cleaned))
  if (!result.success) throw new Error("Invalid AI response structure")

  return result.data
}