import Navbar from "@/components/shared/Navbar"
import HeroSection from "@/components/landing/HeroSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import PricingSection from "@/components/landing/PricingSection"
import Footer from "@/components/landing/Footer"
import HowItWorksSection from "@/components/landing/HowItWorksSection"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-125 w-125 rounded-full bg-violet-500/10 blur-[180px]" />
        <div className="absolute right-0 top-20 h-112.5 w-112.5 rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute bottom-0 left-1/2 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[180px]" />
      </div>

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />

    </main>
  )
}