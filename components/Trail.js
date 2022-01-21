import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import PageContainer from "./PageContainer";
import { useSelector } from "react-redux";

const Trail = ({ trail }) => {
  const user = useSelector((state) => state.user);

  const userButtons = () => {
    if (trail.user.username === user.username) {
      return (
        <>
          <Link href={`/trails/${trail.id}/edit`} passHref>
            <Button m="1em">Edit</Button>
          </Link>
        </>
      );
    }
  };

  return (
    <PageContainer>
      <Container maxW="100vw" p="0" m="0">
        <Heading mb="1em">{trail.title}</Heading>
        <Text>by {trail.user.username}</Text>
        <Text>{trail.description}</Text>
        <Link href="/trails" passHref>
          <Button mt="1em">&larr; All trails</Button>
        </Link>
        {userButtons()}
      </Container>
    </PageContainer>
  );
};

export default Trail;
