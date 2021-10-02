import { Box, Text } from "@chakra-ui/react";

const Footer = () => (
  <Box textAlign="center" py="0.8em">
    <Text fontWeight="200" fontSize="0.8em">
      {new Date().getFullYear()} THROUGH THE WOODS &copy;
    </Text>
  </Box>
);

export default Footer;
