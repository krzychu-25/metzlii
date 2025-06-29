// app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, name, password, tags } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email i hasło są wymagane" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "Użytkownik już istnieje" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      tags: tags || "",
    },
  });

  return NextResponse.json({ message: "Użytkownik zarejestrowany" });
}
