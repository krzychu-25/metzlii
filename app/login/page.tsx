// app/login/page.tsx
"use client"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (err: any) {
      setError("Błąd logowania: " + err.message)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Logowanie</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="block my-2" />
      <input placeholder="Hasło" type="password" value={password} onChange={e => setPassword(e.target.value)} className="block my-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Zaloguj</button>
    </div>
  )
}