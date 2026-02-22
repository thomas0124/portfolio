interface FloatingNavProps {
  activeSection: string | null
}

export default function FloatingNav({ activeSection }: FloatingNavProps) {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center space-y-6">
        <a
          href="#"
          className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === null ? 'bg-blue-400 scale-125 shadow-md shadow-blue-500/50' : 'bg-gray-400 hover:bg-blue-300'}`}
          aria-label="Go to top"
        />
        <a
          href="#projects"
          className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'projects' ? 'bg-blue-400 scale-125 shadow-md shadow-blue-500/50' : 'bg-gray-400 hover:bg-blue-300'}`}
          aria-label="Go to projects"
        />
        <a
          href="#contact"
          className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'bg-blue-400 scale-125 shadow-md shadow-blue-500/50' : 'bg-gray-400 hover:bg-blue-300'}`}
          aria-label="Go to contact"
        />
      </div>
    </div>
  )
}
