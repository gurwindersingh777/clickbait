import { PRESETS } from "@/constants/presets"
import { auth } from "@/lib/auth"
import { ai } from "@/lib/gemini"
import { prisma } from "@/lib/prisma"
import { generateSchema } from "@/schemas/generateSchema"
import { validationResponseSchema } from "@/schemas/validationResponseSchema"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 60

const DAILY_LIMITS = {
  FREE: 3,
  PRO: 20,
  ELITE: Infinity,
}

const THUMBNAIL_VALIDATOR_PROMPT = `
  You are a YouTube thumbnail prompt validator.

  Determine whether the prompt contains enough visual detail
  to generate a compelling thumbnail.

  Return ONLY valid JSON.

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
  - no markdown
  - no code fences
  - output raw JSON only
  `

export async function POST(request: NextRequest) {
  try {
    // Session Validation
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }

    // Form Data
    const formData = await request.formData()

    const formFields = {
      preset: formData.get("preset"),
      prompt: formData.get("prompt"),
      aspectRatio: formData.get("aspectRatio"),
      quality: formData.get("quality"),
    }

    const baseImage = formData.get("baseImage") as File | null

    if ((baseImage && baseImage.size > 0) && session.user.tier === "FREE") {
      return NextResponse.json(
        { error: "Base image upload requires Pro or Elite" }, { status: 403 })
    }

    // Zod Validation
    const validationResult = generateSchema.safeParse(formFields)

    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.issues[0]?.message }, { status: 400 })
    }

    const { preset, prompt } = validationResult.data

    // User Validation
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Reset generation count when a new day starts.
    const today = new Date().toDateString()
    const lastGenerationDate = user.lastGenerationDate?.toDateString()
    const isNewDay = lastGenerationDate !== today

    if (isNewDay) {
      await prisma.user.update({
        where: { id: user.id },
        data: { generationsToday: 0, lastGenerationDate: new Date() }
      })
    }

    // Check Daily Limit
    const currentGenerations = isNewDay ? 0 : user.generationsToday

    if (currentGenerations >= DAILY_LIMITS[user.tier]) {
      return NextResponse.json(
        { error: "Daily generation limit reached" }, { status: 403 })
    }

    const presetConfig = PRESETS[preset as keyof typeof PRESETS]

    const aiUserMessage = `
      Preset: ${presetConfig.label}

      Style:
      ${presetConfig.aiStyle}

      User Prompt:
      ${prompt}
      `

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: THUMBNAIL_VALIDATOR_PROMPT,
      },
      contents: aiUserMessage,
    })

    if (!geminiResponse.text) {
      return NextResponse.json(
        {
          error: "Empty AI response",
        },
        {
          status: 500,
        }
      )
    }

    // Gemini sometimes wraps JSON in markdown code fences.
    const cleanedResponse =
      geminiResponse.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

    const aiResponse =
      JSON.parse(cleanedResponse)

    // Verify the AI returned exactly the structure we expect.
    const aiValidationResult =
      validationResponseSchema.safeParse(
        aiResponse
      )

    if (!aiValidationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid AI response",
        },
        {
          status: 500,
        }
      )
    }

    const aiResult =
      aiValidationResult.data

    // Return a user-friendly validation error.
    if (!aiResult.isValid) {
      return NextResponse.json(
        {
          error: aiResult.reason,
        },
        {
          status: 400,
        }
      )
    }

    return NextResponse.json({
      improvedPrompt:
        aiResult.improvedPrompt,
      titles: aiResult.titles,
    })
  } catch (error) {
    console.error(
      "Generate route error:",
      error
    )

    return NextResponse.json(
      {
        error:
          "An error occurred while processing the request.",
      },
      {
        status: 500,
      }
    )
  }
}