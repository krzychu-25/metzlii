// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Witaj w Metzlii</h1>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Rejestracja
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Logowanie
        </Link>
      </div>
    </main>
  );
}
