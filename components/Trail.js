import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import PageContainer from "./PageContainer";
import { useSession } from "next-auth/react";

const Trail = ({ trail }) => {
  const { data: session } = useSession();

  const authorButtons = () => {
    return (
      <>
        <Link href={`/trails/${trail.id}/edit`} passHref>
          <Button m="1em">Edit</Button>
        </Link>
      </>
    );
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
        {session && trail.user.username === session.username && authorButtons()}
      </Container>
    </PageContainer>
  );
};

export default Trail;
