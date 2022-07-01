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

    const statsArr = {
      elevation: _.map(trails, (trail) => trail.elevation),
      duration: _.map(trails, (trail) => trail.duration),
      distance: _.map(trails, (trail) => trail.distance),
    };

    // youre trying to get the highest of all , and their respective data(title w/ a link with id)

    trails = {
      elevationStats: {
        total: _.sumBy(trails, "elevation"),
        average: Math.floor(_.mean(statsArr.elevation)),
        best: trails.sort((a, b) => a.elevation - b.elevation)[
          trails.length - 1
        ],
      },
      durationStats: {
        total: _.sumBy(trails, "duration"),
        average: Math.floor(_.mean(statsArr.duration)),
        best: trails.sort((a, b) => a.duration - b.duration)[trails.length - 1],
      },
      distanceStats: {
        total: _.sumBy(trails, "distance"),
        average: Math.floor(_.mean(statsArr.distance)),
        best: trails.sort((a, b) => a.distance - b.distance)[trails.length - 1],
      },
    };
    console.log(trails);
    return { props: { trails } };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default statistics;
