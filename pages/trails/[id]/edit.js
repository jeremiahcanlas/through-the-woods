import axios from "axios";
import EditTrail from "../../../components/EditTrail";
import { server } from "../../../server";
import { getSession } from "next-auth/react";

const edit = ({ trail }) => <EditTrail trail={trail} />;

export const getServerSideProps = async (ctx) => {
  try {
    const res = await axios.get(`${server}/trails/${ctx.params.id}`);
    const trail = await res.data;

    return { props: { trail, session: await getSession(ctx) } };
  } catch {
    console.log("trail error");
    return {
      notFound: true,
    };
  }
};

export default edit;
