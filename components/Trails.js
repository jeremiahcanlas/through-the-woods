import {
  Box,
  Flex,
  Heading,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { TiLocation, TiChartArea } from "react-icons/ti";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";

import accentImage from "../public/blogs-pic.jpg";
import PageContainer from "./PageContainer";

import styles from "../styles/Trails.module.scss";
import { useSession } from "next-auth/react";

const Trails = ({ trails }) => {
  const { data: session } = useSession();

  return (
    <PageContainer image={accentImage} title="Trails">
      <Flex direction="column" p="0" my="1em" justifyContent="center">
        {session && (
          <Link href={`/trails/create`} passHref>
            <Button
              p="1px"
              borderColor="#40916c"
              variant="outline"
              fontWeight="300"
              textColor="white"
              _hover={{
                textColor: "blackAlpha.800",
                backgroundColor: "whiteAlpha.500",
              }}
              leftIcon={<AiOutlinePlusSquare />}
            >
              Create New trail
            </Button>
          </Link>
        )}
        {trails.map((trail) => {
          let num = Math.floor(Math.random() * trail.images.length);

          return (
            <Link href={`/trails/${trail.id}`} key={trail.id} passHref>
              <Box
                p="1em"
                borderRadius="1em"
                backgroundColor={trail.images.length === 0 && "blackAlpha.900"}
                my="0.5em"
                _hover={{ backgroundColor: "#343a40", opacity: 0.2 }}
                cursor="pointer"
                textAlign="left"
                position="relative"
              >
                <Heading fontSize={["md", "lg"]} letterSpacing={"1px"}>
                  {trail.title}
                </Heading>

                <Tag variant={"outline"} my="0.5em" size={("sm", "md")}>
                  <TagLeftIcon as={TiLocation} m={0} />
                  <TagLabel ml="0.2em" fontSize={"0.9em"} letterSpacing={"1px"}>
                    {trail.location}
                  </TagLabel>
                </Tag>
                <HStack>
                  <Tag variant={"outline"} my="0.5em" size={("sm", "md")}>
                    <TagLeftIcon as={GiPathDistance} m={0} fontSize={"1.8em"} />
                    <TagLabel
                      ml="0.2em"
                      fontSize={"0.9em"}
                      letterSpacing={"1px"}
                    >
                      2.4km
                    </TagLabel>
                  </Tag>
                  <Tag variant={"outline"} my="0.5em" size={("sm", "md")}>
                    <TagLeftIcon as={TiChartArea} m={0} />
                    <TagLabel
                      ml="0.2em"
                      fontSize={"0.9em"}
                      letterSpacing={"1px"}
                    >
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
                    quality={30}
                    blurDataURL={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c/ToUgAHuAL9y9RxDwAAAABJRU5ErkJggg=="
                    }
                    placeholder="blur"
                    className={styles.image}
                    priority
                  />
                )}
              </Box>
            </Link>
          );
        })}
      </Flex>
    </PageContainer>
  );
};

export default Trails;
