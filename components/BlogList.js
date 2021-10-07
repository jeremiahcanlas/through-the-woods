import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

import accentImage from "../public/blogs-pic.jpg";
import PageContainer from "./PageContainer";

const BlogList = ({ blogs }) => (
  <PageContainer image={accentImage} title="Blogs">
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
            <Heading fontSize={["1em", "1.2em"]}>{blog.title}</Heading>
          </Box>
        </Link>
      ))}
    </Flex>
  </PageContainer>
);

export default BlogList;
