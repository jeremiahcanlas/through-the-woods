import { Box, Flex, Heading } from "@chakra-ui/layout";

const BlogList = ({ blogs }) => (
  <Flex
    direction="column"
    border="2px"
    p="1em"
    h="40vw"
    justifyContent="center"
    backgroundColor="blackAlpha.500"
  >
    {blogs.map((blog) => (
      <Box
        key={blog.id}
        p="1em"
        borderRadius="1em"
        backgroundColor="blackAlpha.900"
        my="0.5em"
      >
        <Heading fontSize="1em">{blog.title}</Heading>
      </Box>
    ))}
  </Flex>
);

export default BlogList;
