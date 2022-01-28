import {
  Container,
  Heading,
  Text,
  Button,
  Divider,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import PageContainer from "./PageContainer";
import { useSession } from "next-auth/react";
import Carousel from "./Carousel";

const Trail = ({ trail }) => {
  const { data: session } = useSession();
  const images = trail.images.map((img) => img.formats.medium.url);

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

        {trail.images.length >= 1 && (
          <Flex
            position="relative"
            justifyContent={"center"}
            alignItems={"center"}
            py="2em"
            height={["30vh", "50vh", "60vh"]}
          >
            <Carousel images={images} />
          </Flex>
        )}

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
