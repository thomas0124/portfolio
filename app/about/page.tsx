'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollProgress from '@/components/common/ScrollProgress'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import ExperienceSection from '@/components/features/experience/ExperienceSection'

export default function About() {
  const { scrollProgress } = useScrollNavigation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ScrollProgress progress={scrollProgress} />
      <div className="relative z-10">
        <Header />

        <main className="pt-32 pb-20 flex flex-col gap-24 w-full">
          <section className="container mx-auto px-4 max-w-4xl relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card/60 backdrop-blur-md border-2 border-border/60 p-8 md:p-12 rounded-[3rem] shadow-sm transition-all duration-500 hover:shadow-xl hover:border-accent/30 flex flex-col md:flex-row gap-10 items-center md:items-start"
            >
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0 group">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                  <Image
                    src="/profile.jpg"
                    width={224}
                    height={224}
                    alt="Shimizu Toma"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent rounded-full border-4 border-background shadow-md flex items-center justify-center text-xl">
                  👋
                </div>
              </div>

              <div className="flex-1 text-center md:text-left flex flex-col h-full justify-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Shimizu Toma</h1>

                <div className="mb-6 space-y-2">
                  <h2 className="text-xl text-accent font-bold">PROFILE</h2>
                  <p className="text-muted-foreground font-medium text-lg">名城大学</p>
                  <p className="text-muted-foreground font-medium text-lg">理工学研究科 情報工学専攻修士1年</p>
                </div>

                <div className="mt-auto pt-6 border-t-2 border-border/50">
                  <h3 className="text-sm text-accent font-bold mb-4 tracking-wider uppercase">Connect</h3>
                  <div className="flex justify-center md:justify-start gap-5">
                    <a
                      href="https://github.com/thomas0124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-2xl shadow-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50 group"
                    >
                      <Image
                        src="/github.svg"
                        alt="GitHub"
                        width={28}
                        height={28}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/tomas_03124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-2xl shadow-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50 group"
                    >
                      <Image
                        src="/instagram.svg"
                        alt="Instagram"
                        width={28}
                        height={28}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                    <a
                      href="https://x.com/Tomas_engineer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-2xl shadow-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50 group"
                    >
                      <Image
                        src="/twitter.svg"
                        alt="X"
                        width={28}
                        height={28}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
          <ExperienceSection />
        </main>

        <Footer />
      </div>
    </div>
  )
}
