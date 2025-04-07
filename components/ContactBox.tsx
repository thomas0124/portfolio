'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'

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
        description: 'メッセージが正常に送信されました。お問い合わせありがとうございます！',
        variant: 'default',
        className: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none'
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
    <div className="text-white w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
            Your Email
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="relative bg-black/50 border-blue-900/50 focus:border-blue-500 text-white w-full rounded-lg focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-blue-300 mb-1">
            Message
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="relative bg-black/50 border-blue-900/50 focus:border-blue-500 text-white w-full rounded-lg focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              placeholder="Your message here..."
              rows={5}
            />
          </div>
        </div>

        <div className="flex justify-center sm:justify-start">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full sm:w-[180px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2 px-6 rounded-full shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  )
}
