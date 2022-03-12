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

  return (
    <PageContainer>
      <Container maxW={["100vw", "80vw", "60vw"]} overflowX={"hidden"}>
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
            height={["30vh", "50vh"]}
            maxW={"100vw"}
            my={"2em"}
          >
            <Carousel images={images} />
          </Flex>
        )}

        <Text>{trail.description}</Text>
        <Divider orientation="horizontal" my="1em" />
        <Stack direction={"row"} spacing="3em" m="2em" letterSpacing={"1px"}>
          <Stack direction={"column"}>
            <Text>Length</Text>
            <Text fontWeight={"900"}>{trail.distance}km</Text>
          </Stack>
          <Stack direction={"column"}>
            <Text>Elevation</Text>
            <Text fontWeight={"900"}>521 m</Text>
          </Stack>
          <Stack direction={"column"}>
            <Text>Type</Text>
            <Text fontWeight={"900"}>Loop</Text>
          </Stack>
        </Stack>
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
