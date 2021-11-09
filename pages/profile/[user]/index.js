import Profile from "../../../components/Profile";
import axios from "axios";

const index = ({ profile }) => <Profile profile={profile[0]} />;

//SSR option but static is more efficient & faster
export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(
      `http://localhost:1337/profiles?username=${context.params.user}`
    );

    const profile = await res.data;

    console.log(profile);
    if (!profile.length) {
      return {
        notFound: true,
      };
    }

    return { props: { profile } };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default index;
