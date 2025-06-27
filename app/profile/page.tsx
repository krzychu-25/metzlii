// app/profile/page.tsx
"use client"
import { useState } from "react"
import { db, auth } from "../../firebase"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function ProfileSetup() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [interests, setInterests] = useState("")
  
  const handleSave = async () => {
    const user = auth.currentUser
    if (!user) return

    const tags = interests.split(",").map(tag => tag.trim().toLowerCase())
    await setDoc(doc(db, "users", user.uid), {
      name,
      interests: tags
    })
    router.push("/")
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Twój profil</h1>
      <input placeholder="Imię" value={name} onChange={e => setName(e.target.value)} className="block my-2" />
      <input placeholder="Zainteresowania (np. muzyka, kodowanie)" value={interests} onChange={e => setInterests(e.target.value)} className="block my-2" />
      <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">Zapisz</button>
    </div>
  )
}