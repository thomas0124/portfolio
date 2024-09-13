'use client'

import Image from 'next/image'
import Header from '@/components/Header'
import SkillsGlobe from '@/components/SkillsGlobe'
import BackgroundGlobe from '@/components/BackgroundGlobe'
import { useState } from 'react'

const experiences = [
  '2021年4月: 名城大学入学',
  '2021年5月: 大学で初めてプログラミングを学ぶ（C言語)',
  '2021年12月: 趣味でゲーム開発を始める',
  '2022年4月: 大学発足のITコミュニティIdeaxTechに参加',
  '2022年10月: 初めてハッカソン(JPHACKS)に参加し企業賞を取得(Huawei Japan賞)',
  '2022年11月: プログラミングスクールCodegym Academyに参加',
  '2022年12月: 初めてのオフラインハッカソンに参加(その際AR作品を展示)',
  '2023年2月: ハーバード大学CS50修了',
  '2023年3月: CodegymAcademyを卒業',
  '2023年6月: 長期インターンでDMM WEB CAMPのメンターに',
  '2023年10月: JPHACKS2023に参加しGMO賞を取得',
  '2023年12月: 大学とLINE×ヤフー協力のHack Uに参加し審査員賞を取得',
  '2024年3月: IdeaxTechの代表に',
  '2024年3月: 深層学習をメインとした研究室に所属'
]

export default function Page() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="min-h-screen text-white">
      <BackgroundGlobe />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-opacity-70 rounded-lg ">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3  bg-opacity-50 p-8">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-lg">
                  <Image
                    src="/profile.jpg"
                    alt="Profile illustration"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-300">Shimizu Toma</div>
                <div className="mb-8">
                  <h3 className="font-bold mb-2 text-2xl text-blue-400">PROFILE</h3>
                  <p className="text-gray-300">名城大学</p>
                  <p className="text-gray-300">理工学部 情報工学科4年</p>
                </div>
                <hr className="border-gray-600 mb-8" />
                <div>
                  <h3 className="font-bold mb-4 text-2xl text-blue-400">SNS</h3>
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
              <div className="w-full md:w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-8 text-blue-300">ABOUT ME</h2>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">EXPERIENCE</h3>
                <div className="relative pl-6 mb-12">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-blue-500"></div>
                  <ul className="space-y-6">
                    {experiences.map((experience, index) => (
                      <li key={index} className="relative">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-800"></div>
                        <span className="ml-4 text-gray-300">{experience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">SKILLS</h3>
                <div className="w-full h-[720px]">
                  <SkillsGlobe onHoverSkill={setHoveredSkill} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {hoveredSkill && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
          {hoveredSkill}
        </div>
      )}
    </div>
  )
}
