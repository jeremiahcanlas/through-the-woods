import axios from "axios";

const index = ({ blog }) => {
  console.log(blog);
  return <div>{blog.body}</div>;
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
