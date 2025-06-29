// app/api/matches/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const currentTags = currentUser.tags.split(",").map((t) => t.trim().toLowerCase());

  if (currentTags.length === 0) {
    return NextResponse.json({ matches: [] });
  }

  const users = await prisma.user.findMany({
    where: {
      NOT: { id: currentUser.id },
      AND: currentTags.map((tag) => ({
        tags: {
          contains: tag,
          mode: "insensitive",
        },
      })),
    },
  });

  return NextResponse.json({ matches: users });
}
