import BlogList from "../components/BlogList";
import Meta from "../components/Meta";
import axios from "axios";

const blogs = ({ blogs }) => (
  <>
    <Meta title="Through the Woods - Blogs" />
    <BlogList blogs={blogs} />;
  </>
);
blogs.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/blogs");
  const blogs = await res.data;
  return { blogs };
};

export default blogs;
