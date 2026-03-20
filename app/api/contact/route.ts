import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  try {
    const body = await req.json()
    console.log('Contact form received:', JSON.stringify(body))
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Secret key prefix:', process.env.SUPABASE_SECRET_KEY?.slice(0, 20))

    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name, email, subject: subject ?? 'General enquiry', message })
      .select()

    console.log('Supabase insert result:', JSON.stringify({ data, error: dbError }))

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
