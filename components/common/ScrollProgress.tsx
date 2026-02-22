export default function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50">
      <div
        className="h-full bg-accent transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
