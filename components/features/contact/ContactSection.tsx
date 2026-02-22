'use client'

import { motion } from 'framer-motion'
import ContactBox from './ContactBox'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 inline-block relative">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Send me a message!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 shadow-xl shadow-blue-900/10 transform hover:shadow-blue-500/20 transition-all duration-500">
            <ContactBox />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
