'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import bcrypt from "bcryptjs"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
      router.push("/login")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Zarejestruj się</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-2 w-64">
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="input" />
        <input type="password" placeholder="Hasło" required value={password} onChange={e => setPassword(e.target.value)} className="input" />
        <button type="submit" className="btn">Zarejestruj</button>
      </form>
    </main>
  )
}