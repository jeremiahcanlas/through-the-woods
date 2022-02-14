import axios from "axios";
import EditTrail from "../../../components/EditTrail";
import { server } from "../../../server";
import { getSession } from "next-auth/react";

const edit = ({ trail }) => <EditTrail trail={trail} />;

edit.getServerSideProps = async (ctx) => {
  try {
    const res = await axios.get(`${server}/trails/${ctx.params.id}`);
    const trail = await res.data;
    const session = await getSession(ctx);

    if (!session || session.username !== trail.user.username) {
      console.log("couldnt get session");

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return { props: { trail } };
  } catch {
    console.log("trail error");
    return {
      notFound: true,
    };
  }
};

export default edit;
