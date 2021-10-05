import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import backgroundImage from "../public/cover.jpg";

const MotionContainer = motion(Container);

const Layout = ({ children }) => (
  <Container
    maxW="100vw"
    h="100vh"
    centerContent
    backgroundColor="blackAlpha.800"
    pos="relative"
  >
    <MotionContainer
      zIndex="0"
      opacity="0.2"
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

    <Container maxW="container.xl" py="auto" my="auto">
      {children}
    </Container>

    <Footer />
  </Container>
);

export default Layout;
