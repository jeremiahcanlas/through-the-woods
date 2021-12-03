import { destroyCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

//LOGOUT
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    destroyCookie({ res }, "jwt", { path: "/" });

    res.status(200).end();
  } catch (e) {
    console.log(e);
  }
};
