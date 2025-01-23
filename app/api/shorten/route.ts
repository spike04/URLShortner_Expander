import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const urlObj = new URL(url)
    const path = urlObj.pathname.substring(1)
    const shortCode = Buffer.from(path).toString('base64')
    // Take first 8 characters for shorter URL

    // In a real application, you would save this mapping to a database
    // For this example, we'll just return the shortened URL
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`

    return NextResponse.json({ shortUrl })
  } catch {
    return NextResponse.json(
      { error: 'Failed to shorten URL' },
      { status: 500 },
    )
  }
}
