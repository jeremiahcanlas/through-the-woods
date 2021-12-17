import axios from "axios";
import Blog from "../../../components/Blog";

const index = ({ blog }) => <Blog blog={blog} />;

//SSR option but static is more efficient & faster
export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(
      `http://localhost:1337/blogs/${context.params.id}`
    );
    const blog = await res.data;
    console.log(blog);
    return { props: { blog } };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default index;
