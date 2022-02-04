import Trails from "../components/Trails";
import Meta from "../components/Meta";
import axios from "axios";
import { server } from "../server";

const trails = ({ trails, geojsonData }) => (
  <>
    <Meta title="Through the Woods - Trails" />
    <Trails trails={trails} geojson={geojsonData} />
  </>
);
trails.getInitialProps = async () => {
  const geojsonData = { type: "FeatureCollection", features: [] };
  const res = await axios.get(`${server}/trails`);
  const trails = await res.data.reverse();

  await trails.map((trail) => {
    geojsonData.features.push({
      type: "Feature",
      properties: {},
      geometry: trail.geojson,
    });
  });

  return { trails, geojsonData };
};

export default trails;
