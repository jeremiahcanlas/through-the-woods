import { Box, Flex, Heading, Button, Container } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { ImPencil2 } from "react-icons/im";

import accentImage from "../public/blogs-pic.jpg";
import PageContainer from "./PageContainer";

import styles from "../styles/Trails.module.scss";

const Trails = ({ trails }) => {
  const isLoggedIn = useSelector((state) =>
    state.user.username ? true : false
  );

  return (
    <PageContainer image={accentImage} title="Trails">
      <Flex direction="column" p="0" my="1em" justifyContent="center">
        {isLoggedIn && (
          <Link href={`/trails/create`} passHref>
            {/* <Box
              p="1em"
              borderRadius="1em"
              backgroundColor="blackAlpha.900"
              my="0.5em"
              _hover={{ backgroundColor: "#343a40" }}
              cursor="pointer"
              textAlign="center"
              opacity="0.5"
              direction="row"
            >
              <ImPencil2 />
              <Heading fontSize={["1em", "1.2em"]} direction="row">
                New trail
              </Heading>
            </Box> */}

            <Button
              p="1em"
              borderColor="#40916c"
              variant="outline"
              fontWeight="300"
              textColor="white"
              _hover={{
                textColor: "blackAlpha.800",
                backgroundColor: "whiteAlpha.500",
              }}
              leftIcon={<ImPencil2 />}
            >
              New trail
            </Button>
          </Link>
        )}
        {trails.map((trail) => (
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
              <Heading fontSize={["1em", "1.2em"]}>{trail.title}</Heading>
              {trail.images.length >= 1 && (
                <Image
                  src={trail.images[0].formats.medium.url}
                  alt="trail image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center top"
                  className={styles.image}
                />
              )}
            </Box>
          </Link>
        ))}
      </Flex>
    </PageContainer>
  );
};

export default Trails;
