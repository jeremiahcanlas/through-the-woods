import axios from "axios";
import Trail from "../../../components/Trail";
import { server } from "../../../server";

const index = ({ trail }) => <Trail trail={trail} />;

//SSR option but static is more efficient & faster
export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`${server}/trails/${context.params.id}`);
    const trail = await res.data;
    // console.log(trail);
    return { props: { trail } };
  } catch {
    console.log("trail error");
    return {
      notFound: true,
    };
  }
};

export default index;
