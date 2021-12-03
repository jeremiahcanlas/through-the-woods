import { Container, Heading, Center, Text } from "@chakra-ui/react";
import Image from "next/image";
import backgroundImage from "../public/cover.jpg";
import { motion } from "framer-motion";

const MotionContainer = motion(Container);

const Header = ({ user }) => (
  <Container
    textAlign="center"
    height="35vh"
    maxW="100vw"
    zIndex="10"
    position="relative"
  >
    <MotionContainer
      zIndex="-1"
      opacity="0.5"
      maxW="100vw"
      maxH="100vh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 0.5, duration: 1.5 }}
    >
      <Image
        src={backgroundImage}
        alt="cover image"
        layout="fill"
        objectFit="cover"
        quality={60}
      />
    </MotionContainer>
    <Center width="100%" height="100%" flexDirection="column">
      <Container opacity="0.8" width="220px">
        <Image src="/trees.svg" alt="trees" width="160px" height="80px" />
      </Container>
      <Heading
        fontSize={["2em", "2em"]}
        bgGradient="linear(to-t, #2d6a4f 30%,#40916c 70%)"
        bgClip="text"
        letterSpacing="0.2em"
        fontWeight="700"
      >
        THROUGH THE WOODS
      </Heading>
    </Center>
  </Container>
);

export default Header;
