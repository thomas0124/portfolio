import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/features/home/HeroSection'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col justify-center pt-32 pb-20">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
