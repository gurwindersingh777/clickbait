export const TIERS = [
  {
    name: "Free",
    price: "$0",
    generations: "3/day",
    features: ["All 6 presets", "16:9 only", "720p quality"],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12/mo",
    generations: "20/day",
    features: ["All aspect ratios", "1080p quality", "Base image upload"],
    cta: "Go Pro",
    href: "/register",
    highlighted: true,   
  },
  {
    name: "Elite",
    price: "$29/mo",
    generations: "Unlimited",
    features: ["4K quality", "Priority generation", "Everything in Pro"],
    cta: "Go Elite",
    href: "/register",
    highlighted: false,
  },
]