import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import Alert from "./Alert";
import "antd/dist/antd.dark.css";

const Layout = ({ children }) => (
  <Container
    maxW="100%"
    px="0"
    height="100%"
    className="main-layout"
    backgroundColor="blackAlpha.400"
  >
    <Alert />
    {children}
    <Footer />
  </Container>
);

export default Layout;
