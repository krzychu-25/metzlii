'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.ok) router.push("/profile")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Zaloguj się</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="input" />
        <input type="password" placeholder="Hasło" required value={password} onChange={e => setPassword(e.target.value)} className="input" />
        <button type="submit" className="btn">Zaloguj</button>
      </form>
    </main>
  )
}