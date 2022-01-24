import LogIn from "../components/LogIn";
import { getSession } from "next-auth/react";

const login = () => <LogIn />;

export default login;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
