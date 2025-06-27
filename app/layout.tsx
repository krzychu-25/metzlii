export const metadata = {
  title: "Metzlii",
  description: "Poznawaj ludzi z podobnymi zainteresowaniami",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}
