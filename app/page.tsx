"use client"

import { useEffect, useState } from "react"
import { db, auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"

type UserData = {
  name: string
  interests: string[]
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [matches, setMatches] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        try {
          const snapshot = await getDocs(collection(db, "users"))
          const currentUserDoc = snapshot.docs.find(doc => doc.id === user.uid)
          const currentUser = currentUserDoc?.data() as UserData

          if (!currentUser) return setMatches([])

          const others = snapshot.docs
            .filter(doc => doc.id !== user.uid)
            .map(doc => doc.data() as UserData)

          const common = others.filter(other =>
            other.interests?.some(tag => currentUser.interests?.includes(tag))
          )

          setMatches(common)
        } catch (error) {
          console.error("Błąd ładowania danych:", error)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <p>Ładowanie...</p>
  if (!user) return <p>Proszę się <a href="/login" className="text-blue-500 underline">zalogować</a>.</p>

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dopasowani użytkownicy</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Wyloguj
        </button>
      </div>

      {matches.length === 0 ? (
        <p className="text-gray-600">Nie znaleziono dopasowań. Dodaj więcej zainteresowań!</p>
      ) : (
        <ul>
          {matches.map((m, i) => (
            <li key={i} className="border p-4 mt-2 rounded bg-white shadow">
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-600">
                Zainteresowania: {m.interests?.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}