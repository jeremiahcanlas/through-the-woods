import axios from "axios";
import marked from "marked";

const index = ({ blog }) => {
  const body = marked(blog.body);
  console.log(typeof body);
  return <div dangerouslySetInnerHTML={body}></div>;
};

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
