import { Container, Heading, Center } from "@chakra-ui/react";
import Image from "next/image";
import backgroundImage from "../public/cover.jpg";
import { motion } from "framer-motion";
import styles from "../styles/Header.module.scss";

const MotionContainer = motion(Container);

const Header = () => (
  <MotionContainer
    zIndex="-1"
    width="100vw"
    maxW="100%"
    position="relative"
    textAlign="center"
    py="4em"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1.5 }}
  >
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 3 }}
    >
      <Center width="100%" height="100%" flexDirection="column">
        <Container opacity="1" width="220px">
          <Image src="/trees.svg" alt="trees" width="160px" height="80px" />
        </Container>
        <Heading
          fontSize={["1.5em", "2em"]}
          bgGradient="linear(to-t, #40916c 30%,#40916c 70%)"
          bgClip="text"
          className={styles.heading}
        >
          THROUGH THE WOODS
        </Heading>
      </Center>
    </MotionContainer>

    <Image
      src={backgroundImage}
      priority
      alt="cover image"
      layout="fill"
      objectFit="cover"
      quality={30}
      className={styles.image}
    />
  </MotionContainer>
);

export default Header;
