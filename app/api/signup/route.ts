import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password)
      return NextResponse.json({ error: 'Sab fields bharo' }, { status: 400 })
    await connectDB()
    const exists = await User.findOne({ email })
    if (exists)
      return NextResponse.json({ error: 'Email already registered hai' }, { status: 400 })
    const hashed = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashed })
    return NextResponse.json({ message: 'Account ban gaya!' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
