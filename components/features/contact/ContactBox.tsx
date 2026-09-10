'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContactForm } from '@/hooks/useContactForm'
import { Loader2 } from 'lucide-react'

export default function ContactBox() {
  const { email, setEmail, message, setMessage, isSubmitting, handleSubmit } = useContactForm()

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2 ml-1">
            Your Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-2 border-border text-foreground rounded-2xl px-4 py-6 focus-visible:ring-4 focus-visible:ring-accent/30 focus-visible:border-accent transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2 ml-1">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="bg-background border-2 border-border text-foreground rounded-2xl p-4 focus-visible:ring-4 focus-visible:ring-accent/30 focus-visible:border-accent transition-all duration-300 resize-none"
            placeholder="Your message here..."
            rows={5}
          />
        </div>

        <div className="flex justify-center sm:justify-start mt-2">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:opacity-90 font-bold py-6 px-10 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center text-base">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </div>
            ) : (
              <span className="text-base">Send Message</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
