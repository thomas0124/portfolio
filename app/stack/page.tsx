import Header from '@/components/layout/Header'
import SkillsContainer from '@/components/skills/skills-container'
import Footer from '@/components/layout/Footer'

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-32 pb-20 flex-grow">
          <div className="bg-card p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold mb-2 text-foreground relative inline-block sm:text-3xl">
              SKILLS
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent" />
            </h2>
            <p className="text-muted-foreground mb-8 mt-4">Technologies and tools I work with.</p>
            <SkillsContainer />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
