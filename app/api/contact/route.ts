import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json()

    if (!email || !message) {
      return NextResponse.json({ message: 'メールアドレスとメッセージは必須です。' }, { status: 400 })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: '有効なメールアドレスを入力してください。' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    })

    const YOUR_EMAIL = process.env.YOUR_EMAIL || 'your-email@example.com'

    const mailOptions = {
      from: `"お問い合わせフォーム" <${process.env.EMAIL_SERVER_USER}>`,
      to: YOUR_EMAIL,
      replyTo: email,
      subject: `ウェブサイトからの新しいメッセージ`,
      text: `
    送信者: ${email}

    メッセージ:
    ${message}
        `,
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>新しいお問い合わせ</h2>
        <p><strong>送信者:</strong> ${email}</p>
        <div style="margin-top: 20px;">
            <strong>メッセージ:</strong>
            <p style="white-space: pre-line; background-color: #f5f5f5; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
    </div>
    `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: '送信成功' })
  } catch (error) {
    console.error('メール送信エラー:', error)
    return NextResponse.json({ message: 'メッセージ送信中にエラーが発生しました。' }, { status: 500 })
  }
}
