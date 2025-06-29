// app/matches/page.tsx
"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string | null;
  tags: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Ładowanie...</p>;

  if (matches.length === 0)
    return <p className="p-4">Brak dopasowań. Dodaj tagi w profilu.</p>;

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Twoje dopasowania</h1>
      <ul>
        {matches.map(({ id, email, name, tags }) => (
          <li key={id} className="border p-4 mb-3 rounded shadow-sm">
            <p>
              <strong>Imię:</strong> {name || "-"}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Tagi:</strong> {tags}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
