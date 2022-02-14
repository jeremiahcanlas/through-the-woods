import { Text, Container, Link, Icon } from "@chakra-ui/react";
import { ImInstagram } from "react-icons/im";

const Footer = () => (
  <Container textAlign="center" py="0.8em" minW="100%" my="1px">
    <Link
      href="https://instagram.com/_through_the_woods"
      isExternal
      cursor="pointer"
      _focus={{ outline: "none" }}
    >
      <Icon
        as={ImInstagram}
        color="gray.200"
        fontSize="1.4em"
        mb="1em"
        opacity="0.8"
        _hover={{ opacity: "1", color: "smoke" }}
      />
    </Link>
    <Text fontWeight="200" fontSize="0.8em" letterSpacing="1px">
      {new Date().getFullYear()} Through the Woods
    </Text>
  </Container>
);

export default Footer;
