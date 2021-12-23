import Trails from "../components/Trails";
import Meta from "../components/Meta";
import axios from "axios";
import { server } from "../server";

const trails = ({ trails }) => (
  <>
    <Meta title="Through the Woods - Trails" />
    <Trails trails={trails} />
  </>
);
trails.getInitialProps = async () => {
  const res = await axios.get(`${server}/trails`);
  const trails = await res.data;

  return { trails };
};

export default trails;
