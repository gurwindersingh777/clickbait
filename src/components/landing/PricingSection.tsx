import Link from "next/link"
import { Check } from "lucide-react"
import { TIERS } from "@/constants/tiers"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PricingSection() {
  return (
    <section className="px-6 py-20 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">Simple Pricing</h2>
          <p className="mt-6 text-base text-zinc-400 md:text-lg">Start free. Upgrade anytime.</p>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-3xl border p-6 md:p-8",
                tier.highlighted
                  ? "border-violet-500 bg-zinc-900"
                  : "border-zinc-800 bg-zinc-900/50"
              )}
            >
              {tier.highlighted && <Badge className="absolute right-6 top-6 bg-violet-600">Popular</Badge>}
              <h3 className="text-xl font-semibold text-white">{tier.name}</h3>

              <div className="mt-6">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
              </div>

              <p className="mt-2 text-sm text-zinc-500">{tier.generations}</p>

              <ul className="mt-8 flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  "mt-8 w-full",
                  tier.highlighted
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                )}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}