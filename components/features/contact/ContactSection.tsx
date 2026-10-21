import ContactBox from './ContactBox'
import { Toaster } from '@/components/ui/toaster'

export default function ContactSection() {
  return (
    <section id="contact" className="relative">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-foreground inline-block relative md:text-4xl">
            Get In Touch
            <span className="absolute bottom-1 left-0 w-full h-2.5 rounded-full bg-accent/40 -z-10 rotate-1" />
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-4 font-medium md:text-lg">
            Have a question or want to work together? Send me a message!
          </p>
        </div>

        <div>
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-border shadow-md">
            <ContactBox />
          </div>
        </div>
      </div>
    </section>
  )
}
