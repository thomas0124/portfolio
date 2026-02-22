export default function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
