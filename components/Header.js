import { Container, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => (
  <Container
    textAlign="center"
    py="3.5em"
    borderBottom="0.1em solid #40916c"
    borderTop="0.1em solid #40916c"
    maxW="100%"
    zIndex="10"
  >
    <Container opacity="0.8" width="220px">
      <Image src="/trees.svg" alt="trees" width="160px" height="80px" />
    </Container>

    <Heading
      fontSize={["2em", "2em"]}
      bgGradient="linear(to-l, #2d6a4f 30%,#40916c 70%)"
      bgClip="text"
      letterSpacing="0.2em"
      fontWeight="700"
    >
      THROUGH THE WOODS
    </Heading>

    <Text fontSize="0.9em" fontWeight="400" mt="1em">
      A HIKING BLOG
    </Text>
  </Container>
);

export default Header;
