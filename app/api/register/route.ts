import {NextRequest, NextResponse} from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    console.log("✅ /api/register hit");
    const { name, email, password } = await request.json();
    console.log("📝 Received:", { name, email, password });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

