interface FloatingNavProps {
  activeSection: string | null
}

export default function FloatingNav({ activeSection }: FloatingNavProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center gap-6">
        <a
          href="#"
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === null ? 'bg-accent scale-125' : 'bg-border hover:bg-accent/50'}`}
          aria-label="Go to top"
        />
        <a
          href="#projects"
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'projects' ? 'bg-accent scale-125' : 'bg-border hover:bg-accent/50'}`}
          aria-label="Go to projects"
        />
        <a
          href="#contact"
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'bg-accent scale-125' : 'bg-border hover:bg-accent/50'}`}
          aria-label="Go to contact"
        />
      </div>
    </div>
  )
}
