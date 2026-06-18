import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import GenerateForm from "@/components/dashboard/GenerateForm"
import { Tier } from "@prisma/client"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Generate Thumbnail</h1>
        <p className="mt-1 text-sm text-zinc-500">AI-powered YouTube thumbnails</p>
      </div>

      <GenerateForm tier={session!.user.tier as Tier} />
    </div>
  )
}