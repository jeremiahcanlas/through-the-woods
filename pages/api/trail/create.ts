import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, title, location, description } = req.body;

  try {
    const response = await axios.post(
      `${server}/trails`,
      {
        title,
        location,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (e) {
    res.status(404).end();
  }

  //   res.json({ message: "this is the blog create api route" });
};
