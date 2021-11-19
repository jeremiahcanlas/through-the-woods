import Footer from "./Footer";
import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => (
  <Container
    maxW="100vw"
    px="0"
    backgroundColor="gray.900"
    h="100vh"
    centerContent
  >
    <Container maxW="container.l" zIndex="0" py="auto" my="auto" p="0">
      {children}
    </Container>

    <Footer />
  </Container>
);

export default Layout;
