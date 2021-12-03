import { Container, Heading, Box, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../public/about-pic.jpeg";
import { RiHome2Fill } from "react-icons/ri";

const PageContainer = ({ children, image, title, showImg }) => (
  <Container
    maxH="100%"
    minH="100vh"
    minW="100vw"
    textAlign="left"
    opacity="1"
    mb="1.5rem"

    // border="3px solid red"
  >
    <Link href="/" passHref>
      <Heading
        fontSize={["1em", "1.5em"]}
        bgGradient="linear(to-t, #2d6a4f 30%,#40916c 70%)"
        bgClip="text"
        letterSpacing="0.1em"
        fontWeight="700"
        p="1rem 0.1rem"
        cursor="pointer"
        position="sticky"
        top="0"
      >
        THROUGH THE WOODS
      </Heading>
    </Link>

    <Container maxH="100%" minH="100vh" textAlign="left" mt="2rem">
      <Heading as="h2" fontSize="2rem" letterSpacing="2px">
        {title}
      </Heading>

      {/* <Box
      my="1.2em"
      height="20vw"
      maxH="150px"
      overflow="hidden"
      display={!showImg ? "none" : "block"}
      position="relative"
    >
      <Image src={image} alt="cover image" sizes="40vw" layout="responsive" />
    </Box> */}

      {children}
    </Container>
  </Container>
);

PageContainer.defaultProps = {
  image: defaultImage,
  showImg: true,
};

export default PageContainer;
