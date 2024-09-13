'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export default function ContactBox() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Message Sent',
      description: 'Your message has been sent successfully.'
    })
    setEmail('')
    setMessage('')
  }

  return (
    <div className="text-white p-4 sm:p-6 rounded-lg shadow-md max-w-full sm:max-w-[36rem] md:max-w-[48rem] mx-auto mt-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Your Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full text-black"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 w-full text-black"
            placeholder="Your message here..."
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full sm:w-[160px]">
          Send Message
        </Button>
      </form>
    </div>
  )
}
