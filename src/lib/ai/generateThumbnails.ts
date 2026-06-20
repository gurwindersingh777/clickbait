import { ASPECT_RATIOS } from "@/constants/presets"
import { uploadImageBlob } from "../cloudinary"
import { hf } from "../huggingface"

export async function generateThumbnails(fluxPrompt: string, aspectRatio: string): Promise<string[]> {

  const dimensions = ASPECT_RATIOS[aspectRatio as keyof typeof ASPECT_RATIOS]

  const imagePromises = Array.from({ length: 3 }, () =>
    hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: fluxPrompt,
      parameters: {
        num_inference_steps: 4,
        width: dimensions.width,
        height: dimensions.height,
      },
    })
  )

  const generated = await Promise.allSettled(imagePromises)

  // Collecting blob
  const blobs: Blob[] = []

  for (const result of generated) {
    if (result.status === "fulfilled") {
      blobs.push(result.value as unknown as Blob)
    } else {
      console.error("HF generation failed:", result.reason)
    }
  }

  // Upload to cloudinary
  const uploaded = await Promise.allSettled(
    blobs.map((blob) => uploadImageBlob(blob))
  )

  const urls = uploaded
    .filter((result): result is PromiseFulfilledResult<string> => result.status === "fulfilled")
    .map((result) => result.value)

  return urls
}