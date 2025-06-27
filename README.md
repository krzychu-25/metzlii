# metzlii
# Metzlii – MVP

Poznawaj ludzi z podobnymi zainteresowaniami.

## Funkcje
- Rejestracja / logowanie
- Edycja profilu (imię, tagi zainteresowań)
- Dopasowywanie użytkowników po wspólnych tagach

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Prisma + SQLite (na start)
- NextAuth.js

## Jak uruchomić lokalnie

```bash
git clone https://github.com/twoj-login/metzlii.git
cd metzlii

pnpm install
pnpm prisma migrate dev --name init
pnpm dev