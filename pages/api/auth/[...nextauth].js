import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { server } from "../../../server";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${server}/auth/local`, {
            identifier: credentials.identifier,
            password: credentials.password,
          });
          if (data) {
            return data;
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    secret: "test",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30d
    updateAge: 24 * 60 * 60, //24h
  },
  pages: {
    signIn: "login",
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.name = user.user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        session.username = token.name;
        return session;
      }
      return null;
    },
  },
  secret: "test",
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req, res) => NextAuth(req, res, options);
