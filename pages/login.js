import LogIn from "../components/LogIn";
import nookies from "nookies";

const login = () => <LogIn />;

export default login;

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (cookies?.jwt) {
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
