// import Meta from "../components/Meta";
import axios from "axios";
import Stats from "../components/Stats";
import { server } from "../server";
import _ from "lodash";

const statistics = ({ trails }) => <Stats trails={trails} />;

export const getStaticProps = async (ctx) => {
  try {
    const res = await axios.get(`${server}/trails`);
    let trails;

    trails = await res.data;

    //filters only whats needed
    // trails = await trails.map((trail) => ({
    //   elevation: trail.elevation,
    //   duration: trail.duration,
    //   distance: trail.distance,
    // }));

    trails = {
      totalElevation: _.sumBy(trails, "elevation"),
      totalDuration: _.sumBy(trails, "duration"),
      totalDistance: _.sumBy(trails, "distance"),
    };

    return { props: { trails } };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default statistics;
