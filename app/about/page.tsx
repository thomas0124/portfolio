import Image from 'next/image'
import Header from '@/components/Header'
import SkillsContainer from '@/components/skills/skills-container'
import BackgroundGlobe from '@/components/BackgroundGlobe'
import { experiences } from '@/data/experiences'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <BackgroundGlobe />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-opacity-70 rounded-lg mb-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3 bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-lg">
                  <Image
                    src="/profile.jpg"
                    alt="Profile illustration"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-blue-300">
                  Shimizu Toma
                </div>
                <div className="mb-8">
                  <h3 className="font-bold mb-2 text-xl sm:text-2xl text-blue-400">PROFILE</h3>
                  <p className="text-gray-300">名城大学</p>
                  <p className="text-gray-300">理工学部 情報工学科4年</p>
                </div>
                <hr className="border-gray-600 mb-8" />
                <div>
                  <h3 className="font-bold mb-4 text-xl sm:text-2xl text-blue-400">SNS</h3>
                  <div className="flex justify-center space-x-6">
                    <a
                      href="https://github.com/thomas0124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-200"
                    >
                      <Image src="/github.jpeg" alt="GitHub" width={48} height={48} className="rounded-full" />
                    </a>
                    <a
                      href="https://www.instagram.com/tomas_03124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-200"
                    >
                      <Image src="/instagram.jpg" alt="Instagram" width={48} height={48} className="rounded-full" />
                    </a>
                    <a
                      href="https://x.com/Tomas_engineer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-200"
                    >
                      <Image src="/X.jpg" alt="X" width={48} height={48} className="rounded-full" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/3 bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-300">ABOUT ME</h2>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">EXPERIENCE</h3>
                <div className="relative pl-6 mb-6">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-blue-500"></div>
                  <ul className="space-y-4 sm:space-y-6">
                    {experiences.map((experience, index) => (
                      <li key={index} className="relative">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full border-4 border-gray-800"></div>
                        <span className="ml-4 text-sm sm:text-base text-gray-300">{experience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400">SKILLS</h3>
            <SkillsContainer />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
