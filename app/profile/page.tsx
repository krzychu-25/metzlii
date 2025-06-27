'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [name, setName] = useState("")
  const [tags, setTags] = useState("")
  const router = useRouter()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, tags }),
      headers: { "Content-Type": "application/json" }
    })

    router.push("/")
  }

  if (!session) return <p>Logowanie wymagane...</p>

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Twój profil</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-2 w-64">
        <input type="text" placeholder="Imię" required value={name} onChange={e => setName(e.target.value)} className="input" />
        <input type="text" placeholder="Tagi zainteresowań (np. muzyka,gry,koty)" required value={tags} onChange={e => setTags(e.target.value)} className="input" />
        <button type="submit" className="btn">Zapisz</button>
      </form>
    </main>
  )
}