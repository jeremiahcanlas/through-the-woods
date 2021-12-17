import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { jwt } = req.body;
  const server = process.env.PRODUCTION;

  try {
    const response = await axios.get(`${server}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    res.status(200);
    res.end(JSON.stringify(response));
  } catch (e) {
    res.status(404).end();
  }
};
