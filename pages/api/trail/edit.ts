import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // //forward geocoding to get coordinates
  // const geocoding = await axios.get(
  //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.mapbox_token}`
  // );

  // const geojson = geocoding.data.features[0].geometry;

  if (req.method === "PUT") {
    const {
      jwt,
      title,
      location,
      description,
      difficulty,
      type,
      rating,
      distance,
      elevation,
      trailLength,
      id,
      images,
      deleted,
    } = await req.body;

    try {
      const response = await axios.put(
        `${server}/trails/${id}`,
        {
          title,
          location,
          description,
          difficulty,
          type,
          rating,
          distance,
          elevation,
          trailLength,
          images,
          deleted,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (e) {
      console.log(e);
      res.status(404).end();
    }
  } else {
    res.status(500).json({ message: "wrong method or probably headers" });
  }
};
