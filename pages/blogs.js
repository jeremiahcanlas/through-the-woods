import { Container, Heading } from "@chakra-ui/layout";
import Link from "next/link";

import BlogList from "../components/BlogList";
import axios from "axios";
import { Button } from "@chakra-ui/button";

const blogs = ({ blogs }) => {
  return (
    <Container
      textAlign="center"
      backgroundColor="blackAlpha.900"
      opacity="0.6"
      p="1em"
      borderRadius="1em"
    >
      <Heading as="h2">Blogs</Heading>
      <BlogList blogs={blogs} />
      <Link href="/" passHref>
        <Button> &larr; Go back</Button>
      </Link>
    </Container>
  );
};

blogs.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/blogs");
  const blogs = await res.data;
  return { blogs };
};

export default blogs;
