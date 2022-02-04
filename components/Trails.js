import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { TiLocation, TiChartArea } from "react-icons/ti";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";
import PageContainer from "./PageContainer";
import Map from "./Map";

import styles from "../styles/Trails.module.scss";
import { useSession } from "next-auth/react";

const Trails = ({ trails, geojson }) => {
  const { data: session } = useSession();

  return (
    <PageContainer>
      <Flex direction="column" px="2em" my="1em" align={"center"}>
        <Container my="2em" textAlign={["start", "start", "center"]} p="0">
          <Heading as="h2" fontSize="2rem" letterSpacing="2px">
            Trails
          </Heading>
        </Container>

        <Container maxW={"100vw"} height={"30vh"} mx="0" my={"1em"}>
          <Map trails={trails} geojson={geojson} />
        </Container>

        {session && (
          <Link href={`/trails/create`} passHref>
            <Button
              width={["100%", "70%", "50%"]}
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
        <Wrap spacing={"0.5em"} my="2em" justify={"center"} width={"100%"}>
          {trails.map((trail) => {
            let num = Math.floor(Math.random() * trail.images.length);

            return (
              <Link href={`/trails/${trail.id}`} key={trail.id} passHref>
                <Container
                  w={["100%", "80%", "50%"]}
                  p={"40px"}
                  borderRadius="1em"
                  backgroundColor={
                    trail.images.length === 0 && "blackAlpha.900"
                  }
                  _hover={{ backgroundColor: "#343a40", opacity: 0.8 }}
                  cursor="pointer"
                  textAlign="left"
                  position="relative"
                >
                  <Heading fontSize={["md", "lg"]} letterSpacing={"1px"}>
                    {trail.title}
                  </Heading>

                  <Tag variant={"outline"} my="0.5em" size={("sm", "md")}>
                    <TagLeftIcon as={TiLocation} m={0} />
                    <TagLabel
                      ml="0.2em"
                      fontSize={"0.9em"}
                      letterSpacing={"1px"}
                    >
                      {trail.location}
                    </TagLabel>
                  </Tag>

                  <HStack>
                    <Tag variant={"outline"} my="0.5em" size={("sm", "md")}>
                      <TagLeftIcon
                        as={GiPathDistance}
                        m={0}
                        fontSize={"1.8em"}
                      />
                      <TagLabel fontSize={"0.9em"} letterSpacing={"1px"}>
                        2.4km
                      </TagLabel>
                    </Tag>
                    <Tag variant={"outline"} my="0.5em" size={("sm", "md")}>
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
                      quality={[20, 70]}
                      blurDataURL={
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c/ToUgAHuAL9y9RxDwAAAABJRU5ErkJggg=="
                      }
                      placeholder="blur"
                      className={styles.image}
                    />
                  )}
                </Container>
              </Link>
            );
          })}
        </Wrap>
      </Flex>
    </PageContainer>
  );
};

export default Trails;
