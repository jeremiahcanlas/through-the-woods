import {
  Badge,
  Container,
  Heading,
  Text,
  Button,
  Divider,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "./PageContainer";
import { useSession } from "next-auth/react";
import Carousel from "./Carousel";
import allTrailsLogo from "../public/alltrailslogo.svg";
import convert from "humanize-duration";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Trail = ({ trail }) => {
  const { data: session } = useSession();
  const [loading, triggerLoad] = useState(false);
  const images = trail.images.map((img) => img.formats.medium.url);

  console.log(trail);
  const authorButtons = () => {
    return (
      <>
        <Link href={`/trails/${trail.id}/edit`} passHref>
          <Button
            m="1em"
            isLoading={loading}
            onClick={() => triggerLoad(!loading)}
          >
            Edit
          </Button>
        </Link>
      </>
    );
  };

  const difficultyColor = () => {
    if (trail.difficulty === "Easy") {
      return "green";
    }

    if (trail.difficulty === "Moderate") {
      return "yellow";
    }

    return "red";
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <PageContainer>
      <Container maxW={["100vw", "80vw", "60vw"]} overflowX={"hidden"}>
        <Heading>{trail.title}</Heading>
        <Text fontSize={"0.8em"} my="0.5em">
          {trail.city}
        </Text>
        <Text fontSize={"0.8em"}>
          {new Date(trail.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <Stack direction={"row"} my="0.5em">
          <Badge colorScheme={difficultyColor()}>{trail.difficulty}</Badge>
          <Stack direction={"row"} my="0.5em" spacing={"1"}>
            {stars.map((star) =>
              trail.rating >= star ? (
                <AiFillStar key={star} color="rgb(221, 227, 146)" />
              ) : (
                <AiOutlineStar key={star} />
              )
            )}
          </Stack>
        </Stack>
        <Text fontSize={"0.8em"}>
          <b>Est.</b>{" "}
          {convert(trail.duration, { delimiter: " and ", round: true })}
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
            <Text fontWeight={"900"}>{trail.distance} km</Text>
          </Stack>
          <Stack direction={"column"}>
            <Text>Elevation gain</Text>
            <Text fontWeight={"900"}>{trail.elevation} m</Text>
          </Stack>
          <Stack direction={"column"}>
            <Text>Type</Text>
            <Text fontWeight={"900"}>{trail.type}</Text>
          </Stack>
        </Stack>
        {trail.allTrailsUrl && (
          <Box mb="3rem">
            <Text fontWeight={"600"} mb="1em">
              AllTrails&reg; Recording:
            </Text>
            <a
              href={trail.allTrailsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button position="relative" variant={"outline"}>
                <Image
                  src={allTrailsLogo}
                  alt="alltrails logo"
                  height={"20%"}
                  width={"100%"}
                />
              </Button>
            </a>
          </Box>
        )}
        <Stack direction={"row"} mt="1em">
          <Link href="/trails" passHref>
            <Button>&larr; Trails</Button>
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
