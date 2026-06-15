import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="container mx-auto px-6 py-12">

        <div className="flex flex-col gap-10 md:flex-row md:justify-between">

          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white">ClickBait</span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Generate YouTube thumbnail ideas from a simple prompt.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="mb-4 text-sm font-medium text-white">Product</h4>

              <div className="space-y-3 text-sm text-zinc-400">
                <Link href="/register" className="block transition hover:text-white">Get Started</Link>
                <Link href="/pricing" className="block transition hover:text-white">Pricing</Link>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium text-white">Account</h4>

              <div className="space-y-3 text-sm text-zinc-400">
                <Link href="/login" className="block transition hover:text-white">Login</Link>
                <Link href="/register" className="block transition hover:text-white">Register</Link>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} ClickBait</p>
          <Link className="text-zinc-400" href="https://github.com/gurwindersingh777" >Github</Link>
        </div>
      </div>
    </footer>
  )
}