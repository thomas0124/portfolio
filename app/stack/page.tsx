import Header from '@/components/layout/Header'
import SkillsContainer from '@/components/skills/skills-container'
import BackgroundGlobe from '@/components/common/BackgroundGlobe'
import Footer from '@/components/layout/Footer'

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <BackgroundGlobe />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400">SKILLS</h3>
          <SkillsContainer />
        </div>
        <Footer />
      </div>
    </div>
  )
}
