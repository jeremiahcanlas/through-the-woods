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
  const trails = await res.data.reverse();

  //  const locations = trails.map((trail) => trail.location);

  //   // const trailCoordinates = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json`)

  return { trails };
};

export default trails;
