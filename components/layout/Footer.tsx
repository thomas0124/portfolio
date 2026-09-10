export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container mx-auto px-4 py-10 text-center text-muted-foreground text-sm">
      <p className="font-medium">&copy; {currentYear} Shimizu Toma. All rights reserved.</p>
    </footer>
  )
}
