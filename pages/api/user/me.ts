import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  try {
    const response = await axios.get(`${server}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (e) {
    res.status(404).end();
  }
  // console.log(token);

  // res.json({ msg: `${token ? token : "no token"}` });
};
