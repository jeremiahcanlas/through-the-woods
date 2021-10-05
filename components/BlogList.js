import { Box, Flex, Heading, Button, Container } from "@chakra-ui/react";
import Link from "next/link";

const BlogList = ({ blogs }) => (
  <Container
    textAlign="center"
    backgroundColor="blackAlpha.900"
    opacity="0.6"
    p="1em"
    borderRadius="1em"
  >
    <Heading as="h2">Blogs</Heading>
    <Flex direction="column" p={["0", "2em"]} my="1em" justifyContent="center">
      {blogs.map((blog) => (
        <Link href={`/blogs/${blog.id}`} key={blog.id} passHref>
          <Box
            p="1em"
            borderRadius="1em"
            backgroundColor="blackAlpha.900"
            my="0.5em"
            _hover={{ backgroundColor: "#343a40" }}
            cursor="pointer"
            textAlign="left"
          >
            <Heading fontSize={["0.8em", "1em"]}>{blog.title}</Heading>
          </Box>
        </Link>
      ))}
    </Flex>
    <Link href="/" passHref>
      <Button> &larr; Go back</Button>
    </Link>
  </Container>
);

export default BlogList;
