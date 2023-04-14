import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/helpers/dbConnect";
import User from "@/models/User.model";
import { verify } from "hcaptcha";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        await dbConnect();
        const hcaptcha = credentials.hcaptcha;
        const secret = process.env.HCAPTCHA_SECRET_KEY;
        const response = await verify(secret, hcaptcha);
        if (!response.success) {
          throw new Error("Captcha no válido");
        }
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No se encontró el usuario");
        }
        const isPasswordMatch = await user.isPasswordMatch(credentials.password);
        if (!isPasswordMatch) {
          throw new Error("Contraseña incorrecta");
        }
        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);