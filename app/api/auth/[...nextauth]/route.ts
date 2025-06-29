// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// ... inne importy

export const authOptions = {
  providers: [
    CredentialsProvider({ /* ... */ }),
  ],
  // ... inne opcje
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
