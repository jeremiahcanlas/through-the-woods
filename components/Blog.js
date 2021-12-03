import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PageContainer from "./PageContainer";

const Blog = ({ blog }) => (
  <PageContainer>
    <Container maxW="100vw" p="0" m="0">
      <Heading mb="1em">{blog.title}</Heading>
      <Text>by {blog.user.username}</Text>
      <ReactMarkdown>{blog.body}</ReactMarkdown>
      <Button mt="1em">
        <Link href="/blogs" passHref>
          &larr; All Blogs
        </Link>
      </Button>
    </Container>
  </PageContainer>
);

export default Blog;
