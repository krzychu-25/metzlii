'use client'
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold text-lg">Metzlii</Link>
      <div className="flex gap-4">
        {session ? (
          <>
            <Link href="/profile">Profil</Link>
            <button onClick={() => signOut()} className="hover:underline">Wyloguj</button>
          </>
        ) : (
          <>
            <Link href="/login">Zaloguj</Link>
            <Link href="/register">Rejestracja</Link>
          </>
        )}
      </div>
    </nav>
  )
}