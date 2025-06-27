import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.redirect("/login")

  const { name, tags } = await req.json()

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      tags: tags.split(",").map((t: string) => t.trim().toLowerCase())
    }
  })

  return NextResponse.json({ success: true })
}