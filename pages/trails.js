import Trails from "../components/Trails";
import Meta from "../components/Meta";
import axios from "axios";

const trails = ({ trails }) => (
  <>
    <Meta title="Through the Woods - Trails" />
    <Trails trails={trails} />
  </>
);
trails.getInitialProps = async () => {
  const res = await axios.get(`http://localhost:1337/trails`);
  const trails = await res.data;

  console.log(process.env.NEXT_PUBLIC_PRODUCTION);

  return { trails };
};

export default trails;
