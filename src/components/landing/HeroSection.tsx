import Link from "next/link"
import { ArrowRight, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="px-6 py-20 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Create YouTube thumbnails that people actually click
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 md:text-lg">
            Write a prompt. The AI generates multiple thumbnail styles instantly. Pick the one that fits your video.
          </p>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-violet-600 text-white hover:bg-violet-700">
              <Link href="/register" className="flex items-center gap-2">
                Try Generator <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-zinc-500">No setup. Just write a prompt and generate ideas.</p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xl md:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-violet-400" />
                <h3 className="text-base font-medium text-white md:text-lg">Live Thumbnail Generator</h3>
              </div>

              <span className="w-fit rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
                Preview Mode
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="text-xs text-zinc-500">Prompt</p>

                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  “Create a YouTube thumbnail for a video about
                  growing a channel from 0 to 100k subscribers
                  using simple editing techniques. Bold style,
                  high contrast, expressive face.”
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Bold Text Style", "Creator Focused", "High Contrast"].map((tag) => (
                    <span key={tag} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                  <div className="aspect-video bg-linear-to-br from-red-500 via-orange-500 to-yellow-500" />
                  <div className="p-3">
                    <p className="text-xs text-zinc-400">Shock Growth Style</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                  <div className="aspect-video bg-linear-to-br from-violet-600 via-purple-600 to-pink-500" />
                  <div className="p-3">
                    <p className="text-xs text-zinc-400">Creator Reaction Style</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 sm:col-span-2">
                  <div className="aspect-video bg-linear-to-br from-cyan-600 via-blue-600 to-indigo-700" />
                  <div className="p-3">
                    <p className="text-xs text-zinc-400">Clean Educational Style</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-400">Generate multiple thumbnail variations from a single prompt</p>
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700">Generate</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}