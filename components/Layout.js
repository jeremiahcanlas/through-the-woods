import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionContainer = motion(Container);

const Layout = ({ children }) => (
  <Container
    maxW="100vw"
    h="100vh"
    centerContent
    backgroundColor="blackAlpha.800"
  >
    <MotionContainer
      zIndex="0"
      opacity="0.2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 1, duration: 3 }}
    >
      <Image
        src="/cover.jpg"
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
