import {
  Container,
  Text,
  Box,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Trails.module.scss";
import { TiLocation, TiChartArea } from "react-icons/ti";
import { GiPathDistance } from "react-icons/gi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const TrailBox = ({ trail, recent }) => {
  let num = Math.floor(Math.random() * trail.images.length);
  const stars = [1, 2, 3, 4, 5];

  return (
    <Link href={`/trails/${trail.id}`} key={trail.id} passHref>
      <Container
        w={recent ? "100%" : ["100%", "80%", "30%"]}
        p={recent ? "15px" : "40px"}
        maxW={recent && "100%"}
        borderRadius="1em"
        backgroundColor={trail.images.length === 0 && "blackAlpha.900"}
        // _hover={{ backgroundColor: "#343a40", opacity: 0.8 }}
        cursor="pointer"
        textAlign="left"
        position="relative"
        className={styles.trailBox}
      >
        <Stack direction={"row"}>
          <Heading fontSize={["md", "lg"]} letterSpacing={"1px"} margin={0}>
            {trail.title}
          </Heading>
          {/* <Stack direction={"row"} hidden={!recent}>
            <AiFillStar fontSize={"1.5em"} color="rgb(221, 227, 146)" />
            <Text>{trail.rating}</Text>
          </Stack> */}
          <Tag hidden={!recent}>
            <TagLabel fontWeight={600}>{trail.rating}</TagLabel>
            <TagLeftIcon m={0} color="rgb(221, 227, 146)" as={AiFillStar} />
          </Tag>
        </Stack>

        <Tag variant={"outline"} my="0.5em">
          <TagLeftIcon as={TiLocation} m={0} />
          <TagLabel ml="0.2em" fontSize={"0.9em"} letterSpacing={"1px"}>
            {trail.location}
          </TagLabel>
        </Tag>
        <Stack direction={"row"} my="0.5em" hidden={recent}>
          {stars.map((star) =>
            trail.rating >= star ? (
              <AiFillStar color="rgb(221, 227, 146)" />
            ) : (
              <AiOutlineStar />
            )
          )}
        </Stack>
        <HStack hidden={recent}>
          <Tag variant={"outline"} my="0.5em">
            <TagLeftIcon as={GiPathDistance} m={0} fontSize={"1.8em"} />
            <TagLabel fontSize={"0.9em"} letterSpacing={"1px"}>
              {trail.distance}km
            </TagLabel>
          </Tag>
          <Tag variant={"outline"} my="0.5em">
            <TagLeftIcon as={TiChartArea} m={0} />
            <TagLabel fontSize={"0.9em"} letterSpacing={"1px"}>
              {trail.elevation}m
            </TagLabel>
          </Tag>
        </HStack>

        {trail.images.length >= 1 && (
          <Image
            src={trail.images[num].formats.small.url}
            alt="trail image"
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
            quality={"40"}
            blurDataURL={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c/ToUgAHuAL9y9RxDwAAAABJRU5ErkJggg=="
            }
            placeholder="blur"
            className={styles.image}
            priority={false}
          />
        )}
      </Container>
    </Link>
  );
};

export default TrailBox;
