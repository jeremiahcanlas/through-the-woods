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
            // console.log(data);
            return data;
          } else {
            return null;
          }
        } catch (e) {
          // console.log('caught error');
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          // throw new Error(errorMessage + '&email=' + credentials.email)
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30d
    updateAge: 24 * 60 * 60, //24h
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        token.jwt = user.jwt;
      }
      return token;
    },

    async session({ session, user, token }) {
      session.jwt = token.jwt;
      //   session.username = token.name;
      //   console.log(session);
      return session;
    },
  },
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req, res) => NextAuth(req, res, options);
