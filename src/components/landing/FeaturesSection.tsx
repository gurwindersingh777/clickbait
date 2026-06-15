import { Sparkles, WandSparkles, Layers3, Download } from "lucide-react"

const features = [
  {
    title: "GPT-4o Validation",
    description:
      "Every prompt is analyzed, refined, and optimized before generation to maximize thumbnail quality and potential.",
    icon: Sparkles,
  },
  {
    title: "6 Style Presets",
    description:"Generate thumbnails inspired by top-performing creator categories and proven YouTube formats.",
    icon: WandSparkles,
  },
  {
    title: "3 Variants Per Run",
    description:"Receive multiple thumbnail options instantly and choose the strongest performer.",
    icon: Layers3,
  },
  {
    title: "Instant Download",
    description:"Export your generated thumbnails immediately in high quality with no waiting.",
    icon: Download,
  },
]

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Everything You Need To Create Better Thumbnails
          </h2>

          <p className="mt-6 text-base text-zinc-400 md:text-lg">
            Built specifically for creators who care about impressions, CTR, and channel growth.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
                  <Icon className="h-7 w-7 text-violet-400" />
                </div>

                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}