'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export default function ContactBox() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'メッセージ送信中にエラーが発生しました。')
      }

      toast({
        title: '送信完了',
        description: 'メッセージが正常に送信されました。'
      })

      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('送信エラー:', error)
      toast({
        title: 'エラー',
        description:
          error instanceof Error ? error.message : '送信中に問題が発生しました。後でもう一度お試しください。',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
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
        <Button type="submit" className="w-full sm:w-[160px]" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
