
export const ASPECT_RATIOS = {
  "16:9": { width: 1280, height: 720, label: "YouTube (16:9)" },
  "9:16": { width: 720, height: 1280, label: "Shorts / TikTok" },
  "1:1": { width: 1080, height: 1080, label: "Instagram (1:1)" },
  "4:3": { width: 1280, height: 960, label: "Classic (4:3)" },
}

export const PRESETS = {
  mrbeast: {
    label: "MrBeast",
    aiStyle: "bold, high energy, shocked expression, bright colors, extreme challenge",
    textStyle: "UPPERCASE, punchy, uses numbers like $10,000 or 100 days"
  },

  gaming: {
    label: "Gaming",
    aiStyle: "dark dramatic background, neon accents, action-packed, intense",
    textStyle: "aggressive, uses words like INSANE, DESTROYED"
  },

  podcast: {
    label: "Podcast",
    aiStyle: "clean professional studio background, good lighting, minimal",
    textStyle: "question-based, conversational"
  },

  tech: {
    label: "Tech Review",
    aiStyle: "clean white or dark background, product-focused",
    textStyle: "comparison-style, uses vs, review, honest"
  },

  fitness: {
    label: "Fitness",
    aiStyle: "high contrast, gym setting, motivational energy",
    textStyle: "transformation-focused, uses numbers like 30 days"
  },

  education: {
    label: "Education",
    aiStyle: "bright friendly colors, clean background",
    textStyle: "question-based, beginner-friendly, how to"
  },
}