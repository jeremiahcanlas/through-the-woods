import { Container, Heading, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Blog from "../../../components/Blog";

const index = ({ blog }) => <Blog blog={blog} />;

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
