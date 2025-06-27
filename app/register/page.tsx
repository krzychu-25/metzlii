// app/register/page.tsx
"use client"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    router.push("/profile")
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Rejestracja</h1>
      <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="block my-2" />
      <input placeholder="Hasło" type="password" value={password} onChange={e => setPassword(e.target.value)} className="block my-2" />
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">Zarejestruj</button>
    </div>
  )
}
