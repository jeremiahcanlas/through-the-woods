import { Container, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const index = ({ blog }) => (
  <Container w="80vw">
    <Heading mb="1em">{blog.title}</Heading>
    <ReactMarkdown>{blog.body}</ReactMarkdown>
    <Button mt="1em">
      <Link href="/blogs" passHref>
        &larr; All Blogs
      </Link>
    </Button>
  </Container>
);

//SSR option but static is more efficient & faster
export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(
      `http://localhost:1337/blogs/${context.params.id}`
    );
    const blog = await res.data;

    return { props: { blog } };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default index;
