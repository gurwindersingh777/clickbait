"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wand2, Images, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
  user: {
    name: string
    email: string
    tier: string
  }
}

const navLinks = [
  {
    label: "Generate",
    href: "/dashboard",
    icon: Wand2,
  },
  {
    label: "Gallery",
    href: "/dashboard/gallery",
    icon: Images,
  },
  {
    label: "Pricing",
    href: "/dashboard/pricing",
    icon: CreditCard,
  },
]

export default function DashboardSidebar({ user, }: Props) {
  const pathname = usePathname()

  const initials =
    user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">

      <div className="border-b border-zinc-800 p-5">
        <Link href="/" className="text-lg font-semibold text-white">ClickBait</Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition mb-2",
                active
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-xl bg-zinc-900 p-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage />
              <AvatarFallback >
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
              <div className="mt-2">
                <span className="rounded-full bg-violet-500/15 px-2 py-1 text-xs text-violet-300">
                  {user.tier}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}