import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

///NOT IN USE

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, jwt } = req.body;

  await axios.delete(`${server}/trails/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return res.status(200).end();
};
