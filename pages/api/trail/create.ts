import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { jwt, title, location, description, images } = req.body;

  //forward geocoding to get coordinates
  const geocoding = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.mapbox_token}`
  );

  const coordinates = geocoding.data.features[0].geometry;

  try {
    const response = await axios.post(
      `${server}/trails`,
      {
        title,
        location,
        description,
        images,
        coordinates,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (e) {
    res.status(404).end();
  }

  //   res.json({ message: "this is the blog create api route" });
};
