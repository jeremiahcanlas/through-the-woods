import CreateTrail from "../../components/CreateTrail";

import { getSession } from "next-auth/react";

const create = () => <CreateTrail />;

export default create;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
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
