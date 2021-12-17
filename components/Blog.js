import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import PageContainer from "./PageContainer";
import { useSelector } from "react-redux";
import axios from "axios";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);

  const router = useRouter();

  const userButtons = () => {
    if (blog.user.username === user.username) {
      return <Button onClick={() => deletePost()}>Delete</Button>;
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:1337/blogs/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      router.push("/blogs");
    } catch (e) {
      console.log("error");
    }
  };

  return (
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
        {userButtons()}
      </Container>
    </PageContainer>
  );
};

export default Blog;
