import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const response = await axios.post("http://localhost:1337/auth/local", {
      identifier: identifier,
      password: password,
    });
    console.log(response.data);
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};
