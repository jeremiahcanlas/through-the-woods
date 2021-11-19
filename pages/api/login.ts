import axios from "axios";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { identifier, password } = req.body;

  try {
    const response = await axios.post("http://localhost:1337/auth/local", {
      identifier: identifier,
      password: password,
    });

    // sets the cookie when logged in
    setCookie({ res }, "jwt", response.data.jwt, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    console.log(response.data);

    res.status(200).json(response.data);
  } catch (e) {
    res
      // .json({ message: "Please provide the correct identifier and password" })
      .status(404)
      .end();
  }
};
