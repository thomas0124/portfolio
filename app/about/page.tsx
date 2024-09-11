import Image from 'next/image'
import Header from '@/components/Header'
import SkillsGlobe from '@/components/SkillsGlobe'

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
  return (
    <div className="h-auto bg-gradient-to-r from-[#B6A4FF] to-[#366BF4] p-2">
      <Header />
      <main className="bg-white rounded-lg shadow-lg overflow-hidden mx-3 my-8">
        <div className="flex flex-col min-h-[1500px] md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-200 p-4 md:p-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Profile illustration"
                width={160}
                height={160}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-2xl md:text-4xl font-bold text-center mb-4">
              Shimizu
              <br />
              Toma
            </div>
            <div className="mb-6 md:mb-8">
              <h3 className="font-bold mb-2 text-3xl">PROFILE</h3>
              <p>名城大学</p>
              <p>理工学部 情報工学科4年</p>
            </div>
            <hr className="border-gray-400 mb-6 md:mb-8" />
            <div>
              <h3 className="font-bold mb-2 text-3xl">SNS</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://x.com/Tomas_engineer" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/GitHub.png"
                    alt="Profile illustration"
                    width={72}
                    height={72}
                    className="rounded-full mx-3"
                  />
                </a>
                <a href="https://www.instagram.com/tomas_03124" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/instagram.webp"
                    alt="Profile illustration"
                    width={72}
                    height={72}
                    className="rounded-full mx-3"
                  />
                </a>
                <a href="https://github.com/thomas0124" target="_blank" rel="noopener noreferrer">
                  <Image src="/X.jpg" alt="Profile illustration" width={72} height={72} className="rounded-full mx-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">ABOUT ME</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-4">EXPERIENCE</h2>
            <div className="relative pl-6 mb-6 md:mb-8">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-black"></div>
              <ul className="space-y-3 md:space-y-4">
                {experiences.map((experience, index) => (
                  <li key={index} className="relative">
                    <div className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"></div>
                    <span className="ml-2 text-sm md:text-base">{experience}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">SKILLS</h2>
            <div className="w-full h-96 md:h-96">
              <SkillsGlobe />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
