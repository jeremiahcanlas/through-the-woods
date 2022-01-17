import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { jwt, title, location, description, id, images, deleted } = req.body;

  if (req.method === "PUT") {
    try {
      const response = await axios.put(
        `${server}/trails/${id}`,
        {
          title,
          location,
          description,
          images,
          deleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // console.log(response.data);
      res.status(200).json(response.data);
    } catch (e) {
      res.status(404).end();
    }
  } else {
    res.status(500).json({ message: "wrong method or probably headers" });
  }
};
