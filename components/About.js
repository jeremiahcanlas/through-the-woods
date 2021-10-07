import { Container, Heading, Text } from "@chakra-ui/react";

const About = () => (
  <Container
    textAlign="center"
    backgroundColor="blackAlpha.900"
    opacity="0.6"
    p="1em"
    borderRadius="1em"
  >
    <Heading as="h2">About</Heading>
    <Text>
      Hello Everyone! Welcome to our official hiking blog page. You will see
      articles about our hiking journeys all across the world
    </Text>
  </Container>
);

export default About;
