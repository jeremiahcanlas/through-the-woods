import axios from "axios";
import EditTrail from "../../../components/EditTrail";
import { server } from "../../../server";
import nookies from "nookies";

const edit = ({ trail, cookies }) => (
  <EditTrail trail={trail} cookies={cookies} />
);

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

  try {
    const res = await axios.get(`${server}/trails/${ctx.params.id}`);
    const trail = await res.data;
    return { props: { trail, cookies } };
  } catch {
    console.log("trail error");
    return {
      notFound: true,
    };
  }
};

export default edit;
