import { NextResponse } from 'next/server'

// API 라우트 예제
export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from Next.js API!',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  return NextResponse.json({ 
    message: 'Data received',
    data: body 
  })
}

