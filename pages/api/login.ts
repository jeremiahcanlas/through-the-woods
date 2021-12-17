import axios from "axios";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { identifier, password } = req.body;
  const server = process.env.PRODUCTION;

  try {
    const response = await axios.post(`${server}/auth/local`, {
      identifier: identifier,
      password: password,
    });

    // sets the cookie when logged in
    setCookie({ res }, "jwt", response.data.jwt, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).json(response.data);
  } catch (e) {
    console.log("login error");
    res.status(404).end();
  }
};
