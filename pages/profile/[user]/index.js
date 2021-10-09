import UserProfile from "../../../components/UserProfile";
import axios from "axios";

const index = ({ profile }) => <UserProfile profile={profile} />;

//SSR option but static is more efficient & faster
export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`http://localhost:1337/hikers`);

    const profiles = await res.data;

    const profile = profiles.filter(
      (prof) => context.params.user === prof.uuid
    );

    // console.log(profile);

    return { props: { profile } };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default index;
