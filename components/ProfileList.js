import PageContainer from "./PageContainer";
import {
  Container,
  Flex,
  Avatar,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

const ProfileList = ({ users }) => {
  console.log(users);
  return (
    <PageContainer showImg="none" title="Users">
      <Container my="2em">
        {users.map((profile) => (
          <Link href={`/profile/${profile.uuid}`} passHref key={profile.id}>
            <Flex
              bg="green.400"
              borderRadius="1em"
              flexDirection="row"
              my="1rem"
              p="1em"
              cursor="pointer"
            >
              <Avatar name={profile.name} size="lg" />
              <Container textAlign="left">
                <Heading fontSize="1rem">{profile.name}</Heading>
                <Text>{profile.location}</Text>
                <Button mt="0.7em" size="sm" variant="outline">
                  Follow
                </Button>
              </Container>
            </Flex>
          </Link>
        ))}
      </Container>
    </PageContainer>
  );
};

export default ProfileList;
