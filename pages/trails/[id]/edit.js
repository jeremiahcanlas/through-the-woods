import axios from "axios";
import EditTrail from "../../../components/EditTrail";
import { server } from "../../../server";

const edit = ({ trail }) => <EditTrail trail={trail} />;

export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`${server}/trails/${context.params.id}`);
    const trail = await res.data;
    return { props: { trail } };
  } catch {
    console.log("trail error");
    return {
      notFound: true,
    };
  }
};

export default edit;
