import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'Short code is required' },
        { status: 400 },
      )
    }

    try {
      const urlObj = new URL(url)
      const code = url.split('/').pop()
      const orgPath = Buffer.from(code, 'base64').toString()
      const originalUrl = `${urlObj.protocol}//${urlObj.host}/${orgPath}`
      return NextResponse.json({ originalUrl })
    } catch {
      return NextResponse.json({ error: 'Invalid short code' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Failed to expand URL' }, { status: 500 })
  }
}
