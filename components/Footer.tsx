export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
      <p>© {currentYear} Shimizu Toma. All rights reserved.</p>
    </footer>
  )
}
