import Header from "../components/Header";
import Nav from "../components/Nav";
import Meta from "../components/Meta";
import nookies from "nookies";
import axios from "axios";

export default function Home({ user }) {
  return (
    <>
      <Meta />
      <Header user={user} />
      <Nav isLoggedIn={user ? user.confirmed : false} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (cookies?.jwt) {
    try {
      const response = await axios.get("http://localhost:1337/users/me", {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });

      const user = response.data;

      return {
        props: { user },
      };
    } catch (e) {
      console.log("error bro", e);
    }
  }

  return {
    props: {},
  };
};
