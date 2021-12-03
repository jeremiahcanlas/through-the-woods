import CreateBlog from "../../components/CreateBlog";
import nookies from "nookies";

const create = ({ cookies }) => <CreateBlog cookies={cookies} />;

export default create;

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies.jwt) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { cookies },
  };
};
