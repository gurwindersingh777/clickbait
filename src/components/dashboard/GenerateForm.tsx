"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock } from "lucide-react"
import { PRESETS, ASPECT_RATIOS } from "@/constants/presets"
import { generateSchema, type GenerateFormValues } from "@/schemas/generateSchema"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tier } from "@prisma/client"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"

export default function GenerateForm({ tier }: { tier: Tier }) {
  const presetEntries = Object.entries(PRESETS)
  const aspectEntries = Object.entries(ASPECT_RATIOS)

  const [selectedPreset, setSelectedPreset] = useState(presetEntries[0][0])
  const [baseImage, setBaseImage] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    thumbnails: string[]
    titles: string[]
  } | null>(null)


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<GenerateFormValues>({
    resolver: zodResolver(generateSchema),
    mode: "onChange",
    defaultValues: {
      preset: presetEntries[0][0],
      prompt: "",
      aspectRatio: "16:9",
      quality: "720p",
    },
  })

  const prompt = watch("prompt")
  const selectedAspectRatio = watch("aspectRatio")
  const selectedQuality = watch("quality")

  const onSubmit = async (data: GenerateFormValues) => {
    setResult(null)
    setError(null)
    setIsGenerating(true)

    try {
      const formData = new FormData()
      formData.append("preset", data.preset)
      formData.append("prompt", data.prompt)
      formData.append("aspectRatio", data.aspectRatio)
      formData.append("quality", data.quality)
      if (baseImage) formData.append("baseImage", baseImage)

      const response = await axios.post("/api/generate", formData)
      setResult(response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? "Something went wrong")
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const canUseAspectRatio = (ratio: string) => {
    if (tier === "FREE") return ratio === "16:9"
    return true
  }

  const canUseQuality = (quality: string) => {
    if (tier === "ELITE") return true
    if (tier === "PRO") return quality === "720p" || quality === "1080p"
    return quality === "720p"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-base font-semibold text-white">Prompt</h2>

        <Textarea
          maxLength={500}
          placeholder="Describe your thumbnail idea..."
          className="mt-4 min-h-40 border-zinc-800 bg-zinc-950"
          {...register("prompt")}
          required
        />

        <div className="mt-2 flex justify-between text-xs">
          <span className="text-red-400">{errors.prompt?.message}</span>
          <span className="text-zinc-500">{prompt?.length ?? 0}/500</span>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="space-y-6">

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-base font-semibold text-white">Base Image</h2>
            <p className="mt-1 text-sm text-zinc-500">Optional reference image</p>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              disabled={tier === "FREE"}
              onChange={(e) =>
                setBaseImage(e.target.files?.[0] ?? null)
              }
              className="mt-4 block w-full text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-2 file:text-white"
            />

            {baseImage && <p className="mt-3 text-sm text-zinc-400">{baseImage.name}</p>}
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-base font-semibold text-white">Style Preset</h2>

            <div className="mt-4 space-y-2">
              {presetEntries.map(([key, preset]) => {
                const selected = selectedPreset === key

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(key)
                      setValue("preset", key, { shouldValidate: true })
                    }}
                    className={`w-full rounded-xl border p-3 text-left transition ${selected
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-zinc-800 hover:border-zinc-700"
                      }`}
                  >
                    <p className="text-sm font-medium text-white">{preset.label}</p>
                    <p className="text-xs text-zinc-500">{preset.textStyle}</p>
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-base font-semibold text-white">Aspect Ratio</h2>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {aspectEntries.map(([ratio, config]) => {
                const locked = !canUseAspectRatio(ratio)

                return (
                  <label
                    key={ratio}
                    className={cn(
                      "flex items-center justify-between rounded-xl border p-3 text-sm transition",
                      locked
                        ? "cursor-not-allowed border-zinc-800 opacity-50"
                        : selectedAspectRatio === ratio
                          ? "border-violet-500 bg-violet-500/10 cursor-pointer"
                          : "cursor-pointer border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    {config.label}
                    {locked && <Lock className="h-4 w-4" />}

                    <input
                      type="radio"
                      value={ratio}
                      disabled={locked}
                      className="sr-only"
                      {...register("aspectRatio")}
                    />
                  </label>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-base font-semibold text-white">Quality</h2>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["720p", "1080p", "4K"].map((quality) => {
                const locked = !canUseQuality(quality)

                return (
                  <label
                    key={quality}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm transition",
                      locked
                        ? "cursor-not-allowed border-zinc-800 opacity-50"
                        : selectedQuality === quality
                          ? "border-violet-500 bg-violet-500/10 cursor-pointer"
                          : "cursor-pointer border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    {locked && <Lock className="h-4 w-4" />}
                    {quality}

                    <input
                      type="radio"
                      value={quality}
                      disabled={locked}
                      className="sr-only"
                      {...register("quality")}
                    />
                  </label>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button
          type="submit"
          disabled={!isValid || isGenerating}
          className="h-11 w-full rounded-xl bg-violet-600 hover:bg-violet-700"
        >
          {isGenerating
            ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Generating...</>
            : "Generate Thumbnails"
          }
        </Button>
        {error && <div className=" text-sm text-red-400"> {error}</div>}
      </div>

      <section className="rounded-2xl border border-dashed border-zinc-800 p-6">
        {isGenerating ? (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video w-full bg-neutral-800 rounded-2xl" />
            ))}
          </div>
        ) : <p className="text-sm text-zinc-500 text-center">
          Generated thumbnails will appear here
        </p>}

      </section>
    </form>
  )
}