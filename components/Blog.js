import { WrapItem, Container, Heading, Text, Center } from "@chakra-ui/react";

const Blog = ({ blog }) => (
  <WrapItem>
    <Container
      border="0.1em solid #40916c"
      borderRadius="lg"
      p="3"
      maxW={["90vw", "90vw", "30vw"]}
      h="35vh"
    >
      <Heading fontSize="2em" mb="0.5em">
        {blog.title}
      </Heading>
      <Text>{blog.body.substring(0, 150)}...</Text>
    </Container>
  </WrapItem>
);

export default Blog;
