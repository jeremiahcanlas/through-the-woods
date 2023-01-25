import {
  Container,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Trails.module.scss";
import { TiLocation, TiChartArea } from "react-icons/ti";
import { GiPathDistance } from "react-icons/gi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import _ from "lodash";
// import Fade from "react-reveal/Fade";

const TrailBox = ({ trail, recent }) => {
  // let num = Math.floor(Math.random() * trail.images.length);
  const stars = [1, 2, 3, 4, 5];

  return (
    // <Fade bottom>
    <Skeleton isLoaded={trail}>
      <Link href={`/trails/${trail.id}`} key={trail.id} passHref>
        <Container
          // w={recent ? "100%" : ["100%", "80%", "30%"]}
          w={recent ? "100vw" : ["90vw", "80vw", "30vw"]}
          // w={"30vw"}
          h={!recent && "30vh"}
          // maxH="30vh"
          p={recent ? "15px" : "40px"}
          maxW={recent && "100%"}
          borderRadius="1em"
          // backgroundColor={trail.images.length === 0 && "blackAlpha.900"}
          backgroundColor={"blackAlpha.900"}
          alignContent="center"
          cursor="pointer"
          textAlign="left"
          position="relative"
          className={styles.trailBox}
        >
          <Heading fontSize={["md", "lg"]} letterSpacing={"1px"} margin={0}>
            {trail.title}
          </Heading>
          <Stack direction={"row"}>
            <Tag variant={"outline"} my="0.5em" mx="0">
              <TagLeftIcon as={TiLocation} m={0} />
              <TagLabel ml="0.2em" fontSize={"0.9em"} letterSpacing={"1px"}>
                {trail.city}
              </TagLabel>
            </Tag>

            <Tag hidden={!recent} variant="none">
              <TagLabel fontWeight={600}>{trail.rating}</TagLabel>
              <TagLeftIcon m={0} color="rgb(221, 227, 146)" as={AiFillStar} />
            </Tag>
          </Stack>
          <Stack direction={"row"} my="0.5em" hidden={recent}>
            {stars.map((star) =>
              trail.rating >= star ? (
                <AiFillStar key={star} color="rgb(221, 227, 146)" />
              ) : (
                <AiOutlineStar key={star} />
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

          {/* {trail.images.length >= 1 && (
            <Image
              // src={trail.images[num].formats.small.url}
              src={"https://"}
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
          )} */}
        </Container>
      </Link>
    </Skeleton>
    // </Fade>
  );
};

export default TrailBox;
