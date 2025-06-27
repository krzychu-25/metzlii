export default function MatchCard({ user }: any) {
  return (
    <div className="border border-gray-300 p-4 rounded shadow">
      <h2 className="font-semibold text-lg">{user.name || user.email}</h2>
      <p className="text-sm text-gray-600">
        Wspólne zainteresowania: {user.sharedTags.join(", ")}
      </p>
    </div>
  )
}