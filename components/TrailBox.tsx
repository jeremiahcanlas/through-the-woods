import {
  Container,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Trails.module.scss";
import { TiLocation, TiChartArea } from "react-icons/ti";
import { GiPathDistance } from "react-icons/gi";

const TrailBox = ({ trail, recent }) => {
  let num = Math.floor(Math.random() * trail.images.length);

  return (
    <Link href={`/trails/${trail.id}`} key={trail.id} passHref>
      <Container
        w={recent ? "100%" : ["100%", "80%", "50%"]}
        p={recent ? "15px" : "40px"}
        maxW={recent && "100%"}
        borderRadius="1em"
        backgroundColor={trail.images.length === 0 && "blackAlpha.900"}
        _hover={{ backgroundColor: "#343a40", opacity: 0.8 }}
        cursor="pointer"
        textAlign="left"
        position="relative"
      >
        <Heading fontSize={["md", "lg"]} letterSpacing={"1px"}>
          {trail.title}
        </Heading>

        <Tag variant={"outline"} my="0.5em">
          <TagLeftIcon as={TiLocation} m={0} />
          <TagLabel ml="0.2em" fontSize={"0.9em"} letterSpacing={"1px"}>
            {trail.location}
          </TagLabel>
        </Tag>

        <HStack hidden={recent}>
          <Tag variant={"outline"} my="0.5em">
            <TagLeftIcon as={GiPathDistance} m={0} fontSize={"1.8em"} />
            <TagLabel fontSize={"0.9em"} letterSpacing={"1px"}>
              2.4km
            </TagLabel>
          </Tag>
          <Tag variant={"outline"} my="0.5em">
            <TagLeftIcon as={TiChartArea} m={0} />
            <TagLabel fontSize={"0.9em"} letterSpacing={"1px"}>
              531m
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
