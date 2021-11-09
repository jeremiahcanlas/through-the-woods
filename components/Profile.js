import {
  Container,
  Avatar,
  Heading,
  Text,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { ImCross } from "react-icons/im";

const Profile = ({ profile }) => {
  console.log(profile.followers);
  const follow = async () => {
    await axios.put(
      `http://localhost:1337/profiles/${profile.id}`,
      {
        followers: [...profile.followers, { uid: 5 }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Container
      textAlign="center"
      backgroundColor="blackAlpha.900"
      opacity="0.8"
      py="1em"
      borderRadius="1em"
    >
      <Container centerContent>
        <Box textAlign="left" w="100%">
          <Link my="1.2em" href="/" passHref>
            <Button variant="ghost" size="sm" p="0.1em">
              <Icon as={ImCross} fontSize="1em" color="white" />
            </Button>
          </Link>
        </Box>
        <Avatar name={profile.firstName} size="xl" />
        <Heading letterSpacing="1px" mt="0.8em" fontSize="1.4em">
          {profile.firstName}
        </Heading>
        <Text mt="0.4em" fontSize="0.7em" letterSpacing="0.5px">
          {profile.followers.length || "0"} Followers |{" "}
          {profile.following.length || "0"} Following
        </Text>
        <Text letterSpacing="0.5px" fontSize="0.7em">
          {profile.location}
        </Text>
        <Button mt="1.5em" variant="outline" size="sm" onClick={follow}>
          Follow
        </Button>
      </Container>
    </Container>
  );
};

// UserProfile.defaultProps={

// }

export default Profile;
