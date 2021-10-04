import { Box, Flex, Heading } from "@chakra-ui/layout";
import Link from "next/link";

const BlogList = ({ blogs }) => (
  <Flex direction="column" p="1em" h="40vw" justifyContent="center">
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
          <Heading fontSize="1em">{blog.title}</Heading>
        </Box>
      </Link>
    ))}
  </Flex>
);

export default BlogList;
