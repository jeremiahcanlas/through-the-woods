import { destroyCookie } from "nookies";

//LOGOUT
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
  try {
    destroyCookie({ res }, "jwt", { path: "/" });

    res.status(200).end();
  } catch (e) {
    console.log(e);
  }
};
