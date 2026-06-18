import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex">
        <DashboardSidebar
          user={{
            name: session.user.name,
            email: session.user.email,
            tier: session.user.tier,
          }}
        />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}