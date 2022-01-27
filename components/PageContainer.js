import { Container, Heading, Box, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../public/about-pic.jpeg";
import { RiHome2Fill } from "react-icons/ri";

const PageContainer = ({ children, image, title, showImg }) => (
  <Box
    maxH="100%"
    minH="100vh"
    minW="100%"
    textAlign="left"
    opacity="1"
    mb="1.5rem"
  >
    <Box
      // backgroundColor={"currentcolor"}
      position="sticky"
      top="0"
      zIndex={100}
      bgGradient="linear-gradient(to-t,rgba(23,25,35,0),rgba(23,25,35, 1) 40%)"
    >
      <Link href="/" passHref>
        <Heading
          fontSize={["1em", "1.5em"]}
          bgGradient="linear(to-t, #2d6a4f 30%,#40916c 70%)"
          bgClip="text"
          letterSpacing="0.1em"
          fontWeight="700"
          p="1rem 1.5rem"
          cursor="pointer"
          display="inline-block"
        >
          THROUGH THE WOODS
        </Heading>
      </Link>
    </Box>

    <Box maxH="100%" minH="100vh" maxW="100vw" textAlign="left" mt="2rem">
      {title && (
        <Heading as="h2" fontSize="2rem" letterSpacing="2px">
          {title}
        </Heading>
      )}

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
    </Box>
  </Box>
);

PageContainer.defaultProps = {
  image: defaultImage,
  showImg: true,
  title: "",
};

export default PageContainer;
