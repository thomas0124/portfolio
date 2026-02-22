'use client'

import { motion } from 'framer-motion'
import ContactBox from './ContactBox'

export default function ContactSection() {
  return (
    <section id="contact" className="py-8 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-extrabold text-foreground inline-block relative md:text-4xl">
            Get In Touch
            <span className="absolute bottom-1 left-0 w-full h-2.5 rounded-full bg-accent/40 -z-10 rotate-1" />
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-4 font-medium md:text-lg">
            Have a question or want to work together? Send me a message!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-border shadow-md">
            <ContactBox />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
