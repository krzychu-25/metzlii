// app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) redirect("/login");

  const tagsArray = user.tags ? user.tags.split(",").map((t) => t.trim()) : [];

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Profil użytkownika</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Imię:</strong> {user.name || "-"}
      </p>
      <p>
        <strong>Tagi:</strong>{" "}
        {tagsArray.length > 0 ? tagsArray.join(", ") : "Brak tagów"}
      </p>
    </main>
  );
}
