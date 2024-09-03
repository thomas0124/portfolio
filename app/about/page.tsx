import { Github, Instagram, Twitter } from 'lucide-react'
import Header from '@/components/Header'

export default function Page() {
  return (
    <div className="h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <Header />
      <main className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/3 bg-gray-200 p-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 bg-black rounded-full"></div>
              <div className="absolute -left-4 top-1/2 w-8 h-0.5 bg-black"></div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Shimizu
              <br />
              Toma
            </h2>
            <div className="mb-8">
              <h3 className="font-bold mb-2">PROFILE</h3>
              <p>名城大学</p>
              <p>理工学部 情報工学科</p>
            </div>
            <hr className="border-gray-400 mb-8" />
            <div>
              <h3 className="font-bold mb-2">SNS</h3>
              <div className="flex justify-center space-x-4">
                <Twitter className="w-6 h-6" />
                <Instagram className="w-6 h-6" />
                <Github className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-8">ABOUT ME</h2>
            <h2 className="text-2xl font-bold mb-4">EXPERIENCE</h2>
            <div className="relative pl-6 mb-8">
              <div className="absolute left-[5.5px] top-0 bottom-0 w-0.5 bg-black"></div>
              <ul className="space-y-4">
                {['2020 May', '2022 Feb', '2023 Dec', '2024 Jun'].map((date, index) => (
                  <li key={index} className="relative">
                    <div className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"></div>
                    <span className="ml-2">{date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="text-2xl font-bold">SKILLS</h2>
          </div>
        </div>
      </main>
    </div>
  )
}
