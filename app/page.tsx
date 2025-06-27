// app/page.tsx
"use client"
import { useEffect, useState } from "react"
import { db, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"

export default function Home() {
  const [user, setUser] = useState(null)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        const snapshot = await getDocs(collection(db, "users"))
        const currentUser = snapshot.docs.find(doc => doc.id === user.uid)?.data()
        const others = snapshot.docs
          .filter(doc => doc.id !== user.uid)
          .map(doc => doc.data())
        const common = others.filter(other =>
          other.interests?.some(tag => currentUser?.interests?.includes(tag))
        )
        setMatches(common)
      }
    })
  }, [])

  if (!user) return <p>Proszę się zalogować.</p>

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Dopasowani użytkownicy</h1>
      <ul>
        {matches.map((m: any, i) => (
          <li key={i} className="border p-2 mt-2 rounded">
            {m.name} – zainteresowania: {m.interests?.join(", ")}
          </li>
        ))}
      </ul>
    </main>
  )
}