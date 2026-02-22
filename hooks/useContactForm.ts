import { useState } from 'react'
import { useToast } from './use-toast'

export function useContactForm() {
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

  return {
    email,
    setEmail,
    message,
    setMessage,
    isSubmitting,
    handleSubmit
  }
}
