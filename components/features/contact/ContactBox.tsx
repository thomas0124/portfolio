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
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Your Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-border text-foreground focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="bg-background border-border text-foreground focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300"
            placeholder="Your message here..."
            rows={5}
          />
        </div>

        <div className="flex justify-center sm:justify-start">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:opacity-90 font-medium py-2 px-8 rounded-full transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
