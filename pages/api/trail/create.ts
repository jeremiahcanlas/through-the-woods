import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../server";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    jwt,
    title,
    location,
    description,
    difficulty,
    type,
    distance,
    elevation,
    length,
    images,
  } = req.body;

  //forward geocoding to get coordinates
  const geocoding = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.mapbox_token}`
  );

  const geojson = geocoding.data.features[0].geometry;

  console.log(req.body);

  try {
    const response = await axios.post(
      `${server}/trails`,
      {
        title,
        location,
        description,
        images,
        geojson,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    res.status(200);
  } catch (e) {
    res.status(404).end();
  }
};
