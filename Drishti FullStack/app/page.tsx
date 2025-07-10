import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import FeaturesGrid from "@/components/FeaturesGrid"
import StatsSection from "@/components/StatsSection"
import Testimonials from "@/components/Testimonials"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </main>
  )
}
