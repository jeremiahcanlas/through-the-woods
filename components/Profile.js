import { Container, Avatar, Heading, Text, Button } from "@chakra-ui/react";

const Profile = ({ profile }) => {
  return (
    <Container
      textAlign="center"
      backgroundColor="blackAlpha.900"
      opacity="0.8"
      py="1em"
      borderRadius="1em"
    >
      <Container centerContent>
        <Avatar name={profile[0].name} size="xl" />
        <Heading letterSpacing="1px" mt="0.8em" fontSize="1.4em">
          {profile[0].name}
        </Heading>
        <Text mt="0.4em" fontSize="0.7em" letterSpacing="0.5px">
          {profile[0].followers} Followers | {profile[0].following} Following
        </Text>
        <Text letterSpacing="0.5px" fontSize="0.7em">
          {profile[0].location}
        </Text>
        <Button mt="1.5em" variant="outline" size="sm">
          Follow
        </Button>
      </Container>
    </Container>
  );
};

// UserProfile.defaultProps={

// }

export default Profile;
