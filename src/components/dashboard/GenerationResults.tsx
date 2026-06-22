"use client"

import { useState } from "react"
import { Download, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Props {
  thumbnail: string
  titles: string[]
  onSave: (thumbnailUrl: string, title: string) => void
}

export default function GenerationResults({ thumbnail, titles, onSave }: Props) {
  const [selectedTitle, setSelectedTitle] = useState(titles[0] ?? "")

  const handleDownload = async () => {
    const response = await fetch(thumbnail)
    const blob = await response.blob()
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "thumbnail.jpg"
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="space-y-6">

      {/* Single thumbnail */}
      <div className="overflow-hidden rounded-2xl border-2 border-violet-500">
        <img
          src={thumbnail}
          alt="Generated thumbnail"
          className="w-full object-cover"
        />
      </div>

      {/* Title picker */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-400">Pick a title</p>
        {titles.map((title, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedTitle(title)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
              selectedTitle === title
                ? "border-violet-500 bg-violet-500/10 text-white"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
            )}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-zinc-700"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>

        <Button
          type="button"
          className="flex-1 bg-violet-600 hover:bg-violet-700"
          onClick={() => onSave(thumbnail, selectedTitle)}
        >
          <Save className="mr-2 h-4 w-4" />
          Save to Gallery
        </Button>
      </div>
    </div>
  )
}