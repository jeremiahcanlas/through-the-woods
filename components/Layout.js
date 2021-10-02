import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import Image from "next/image";

const Layout = ({ children }) => (
  <Container
    maxW="100vw"
    h="100vh"
    centerContent
    backgroundColor="blackAlpha.100"
  >
    <Container zIndex="-1" opacity="0.2">
      <Image
        src="/cover.jpg"
        alt="cover image"
        layout="fill"
        objectFit="cover"
        quality={50}
        loading="lazy"
      />
    </Container>
    {children}
    <Footer />
  </Container>
);

export default Layout;
