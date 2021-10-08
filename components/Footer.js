import { Box, Text, Container, Link, Icon } from "@chakra-ui/react";
import { ImInstagram } from "react-icons/im";

const Footer = () => (
  <Box textAlign="center" py="0.8em" zIndex="2">
    <Text fontWeight="200" fontSize="0.8em" mb="0.3em" letterSpacing="1px">
      Follow us
    </Text>
    <Link
      href="https://instagram.com/_through_the_woods"
      isExternal
      cursor="pointer"
      zIndex="999"
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
      {new Date().getFullYear()} THROUGH THE WOODS
    </Text>
  </Box>
);

export default Footer;
