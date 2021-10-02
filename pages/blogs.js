import { Container } from "@chakra-ui/layout";
import BlogList from "../components/BlogList";
import axios from "axios";

const blogs = ({ blogs }) => {
  return (
    <Container textAlign="center">
      <BlogList blogs={blogs} />
    </Container>
  );
};

blogs.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/blogs");
  const blogs = await res.data;
  return { blogs };
};

export default blogs;
