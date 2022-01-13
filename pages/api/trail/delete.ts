import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

///NOT IN USE

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, identifier } = req.body;

  // console.log(req);

  if (req.method === "DELETE") {
    console.log("method delete");
    return res.json({ message: "method delete." });
  }

  //delete route from strapi localhost:1337/blogs/${blog_id}

  // try {
  //   const response = await axios.delete("http://localhost:1337/blogs/${id}");

  //   res.status(200).json(response.data);
  // } catch (e) {
  //   res.status(404).end();
  // }
  res.json({ message: "wrong method or probably headers" });
};
