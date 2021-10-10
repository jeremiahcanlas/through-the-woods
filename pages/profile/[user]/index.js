import Profile from "../../../components/Profile";
import axios from "axios";

const index = ({ profile }) => <Profile profile={profile} />;

//SSR option but static is more efficient & faster
export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`http://localhost:1337/hikers`);

    const profiles = await res.data;

    const profile = profiles.filter(
      (prof) => context.params.user === prof.uuid
    );

    if (!profile.length) {
      return {
        notFound: true,
      };
    }

    return { props: { profile } };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default index;
