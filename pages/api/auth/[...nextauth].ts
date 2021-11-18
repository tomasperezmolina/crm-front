import NextAuth, { Awaitable, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const authRes = await fetch("http://localhost:8080/auth", {
            method: "POST",
            body: JSON.stringify({
              //@ts-ignore
              email: credentials.email,
              //@ts-ignore
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!authRes.ok) {
            throw new Error("Wrong email or password");
          }
          const { token } = await authRes.json();
          const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!userRes.ok) {
            throw new Error("User not found!");
          }
          const user = await userRes.json();
          return {
            ...user,
            jwt: token,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
