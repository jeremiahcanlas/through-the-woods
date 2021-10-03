import { Box, Flex, Heading, Button, Link } from "@chakra-ui/layout";
import link from "next/link";

const BlogList = ({ blogs }) => (
  <Flex direction="column" p="1em" h="40vw" justifyContent="center">
    {blogs.map((blog) => (
      <Link href={`/blogs/${blog.id}`} key={blog.id}>
        <Box
          p="1em"
          borderRadius="1em"
          backgroundColor="blackAlpha.900"
          my="0.5em"
          _hover={{ backgroundColor: "gray" }}
          cursor="pointer"
        >
          <Heading fontSize="1em">{blog.title}</Heading>
        </Box>
      </Link>
    ))}
  </Flex>
);

export default BlogList;
