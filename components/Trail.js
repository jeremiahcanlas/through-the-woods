import {
  Container,
  Heading,
  Text,
  Button,
  Divider,
  Stack,
} from "@chakra-ui/react";
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

  console.log(trail);

  return (
    <PageContainer>
      <Container maxW="100vw" m="0">
        <Heading>{trail.title}</Heading>
        <Text fontSize={"0.8em"}>{trail.location}</Text>
        <Text fontSize={"0.8em"}>
          {new Date(trail.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <Divider orientation="horizontal" my="1em" />

        <Text>{trail.description}</Text>
        <Stack direction={"row"} mt="1em">
          <Link href="/trails" passHref>
            <Button>&larr; All trails</Button>
          </Link>
          {session &&
            trail.user.username === session.username &&
            authorButtons()}
        </Stack>
      </Container>
    </PageContainer>
  );
};

export default Trail;
