import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateSchema } from "@/schemas/generateSchema"
import { validatePrompt } from "@/lib/ai/validatePrompt"
import { generateThumbnails } from "@/lib/ai/generateThumbnails"
import { PRESETS } from "@/constants/presets"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 60

const DAILY_LIMITS = {
  FREE: 3,
  PRO: 20,
  ELITE: Infinity,
}

export async function POST(request: NextRequest) {
  try {
    // Auth
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Parse form data
    const formData = await request.formData()

    const baseImage = formData.get("baseImage") as File | null
    const hasBaseImage = baseImage instanceof File && baseImage.size > 0

    const parsed = generateSchema.safeParse({
      preset: formData.get("preset"),
      prompt: formData.get("prompt"),
      aspectRatio: formData.get("aspectRatio"),
      quality: formData.get("quality"),
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message },
        { status: 400 }
      )
    }

    const { preset, prompt, aspectRatio, quality } = parsed.data

    // Fetch user
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    //  Tier feature gates
    if (hasBaseImage && user.tier === "FREE") {
      return NextResponse.json({ error: "Base image upload requires Pro or Elite" }, { status: 403 })
    }
    if (user.tier === "FREE" && (quality !== "720p" || aspectRatio !== "16:9")) {
      return NextResponse.json({ error: "Upgrade required for this quality or aspect ratio" }, { status: 403 })
    }
    if (user.tier === "PRO" && quality === "4K") {
      return NextResponse.json({ error: "4K quality requires Elite" }, { status: 403 })
    }

    // Daily limit check
    const today = new Date().toDateString()
    const isNewDay = user.lastGenerationDate?.toDateString() !== today

    if (isNewDay) {
      await prisma.user.update({
        where: { id: user.id },
        data: { generationsToday: 0, lastGenerationDate: new Date() },
      })
    }

    const currentGenerations = isNewDay ? 0 : user.generationsToday
    if (currentGenerations >= DAILY_LIMITS[user.tier]) {
      return NextResponse.json({ error: "Daily generation limit reached" }, { status: 403 })
    }

    // Validate + improve prompt with Gemini
    const aiResult = await validatePrompt(preset, prompt)
    if (!aiResult.isValid) {
      return NextResponse.json({ error: aiResult.reason }, { status: 400 })
    }

    // Generate 3 thumbnails + upload to Cloudinary
    const presetConfig = PRESETS[preset as keyof typeof PRESETS]
    const fluxPrompt = `${presetConfig.aiStyle}, ${aiResult.improvedPrompt}, youtube thumbnail, high quality`

    const thumbnails = await generateThumbnails(fluxPrompt, aspectRatio)
    if (thumbnails.length === 0) {
      return NextResponse.json({ error: "All image generations failed" }, { status: 500 })
    }

    // Increment counter
    await prisma.user.update({
      where: { id: user.id },
      data: { generationsToday: { increment: 1 }, lastGenerationDate: new Date() },
    })

    // Return
    return NextResponse.json({ thumbnails, titles: aiResult.titles })

  } catch (error) {
    console.error("Generate route error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}