export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
      <div className="mb-3 h-px w-16 mx-auto bg-border" />
      <p>&copy; {currentYear} Shimizu Toma. All rights reserved.</p>
    </footer>
  )
}
