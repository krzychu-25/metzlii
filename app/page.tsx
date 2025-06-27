import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import MatchCard from "@/components/MatchCard"
import Navbar from "@/components/Navbar"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return <main className="p-8 text-center">Zaloguj się, aby zobaczyć dopasowania.</main>
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  const others = await prisma.user.findMany({
    where: {
      id: { not: session.user.id }
    }
  })

  const matches = others
    .map(user => {
      const sharedTags = user.tags.filter(tag => currentUser?.tags.includes(tag))
      return { ...user, sharedTags }
    })
    .filter(user => user.sharedTags.length > 0)

  return (
    <main>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dopasowania</h1>
        {matches.length === 0 ? (
          <p>Brak dopasowań. Dodaj zainteresowania w profilu.</p>
        ) : (
          <div className="grid gap-4">
            {matches.map(match => (
              <MatchCard key={match.id} user={match} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}