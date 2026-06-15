import Link from "next/link"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">ClickBait</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {session ? (
            <Button asChild className="bg-violet-600">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost"
                className="hidden text-zinc-300 hover:bg-zinc-800 hover:text-white sm:flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-violet-600 text-white hover:bg-violet-700">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}