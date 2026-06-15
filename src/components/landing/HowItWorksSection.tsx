import {
  Sparkles,
  WandSparkles,
  Download,
} from "lucide-react"

const steps = [
  {
    title: "Describe Your Video",
    description: "Tell our AI what your video is about and what audience you want to attract.",
    icon: Sparkles,
  },
  {
    title: "Choose A Style",
    description: "Pick from proven thumbnail styles inspired by top-performing creators.",
    icon: WandSparkles,
  },
  {
    title: "Generate & Download",
    description: "Receive multiple thumbnail variations and download your favorite instantly.",
    icon: Download,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-20 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-400">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Create Thumbnails In Seconds
          </h2>

          <p className="mt-6 text-base text-zinc-400 md:text-lg">A simple workflow designed for creators.</p>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.title} className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
                  <Icon className="h-7 w-7 text-violet-400" />
                </div>

                <span className="text-sm font-medium text-violet-400">Step {index + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-zinc-400">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}