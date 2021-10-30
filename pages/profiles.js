import ProfileList from "../components/ProfileList";
import axios from "axios";

const profiles = ({ userProfiles }) => <ProfileList users={userProfiles} />;

profiles.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/profiles");
  const userProfiles = await res.data;
  return { userProfiles };
};

export default profiles;
