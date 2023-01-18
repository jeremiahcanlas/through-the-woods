import Header from "../components/Header";
import Nav from "../components/Nav";
import Meta from "../components/Meta";
import Recent from "../components/Recent";
import { Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import { server } from "../server";

export default function Home({ recent, trails }) {
  return (
    <Flex
      overflow={"hidden"}
      flexDirection="column"
      justifyContent="center"
      align={"center"}
    >
      <Meta />
      <Flex
        justifyContent="center"
        flexDirection="column"
        align={"center"}
        height="80vh"
      >
        <Header />
        <Nav trails={trails} />
      </Flex>
      <Recent trails={recent} />
    </Flex>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(`${server}/trails`);
    const trails = await res.data.reverse();

    const recent = await trails.slice(0, 3);

    return { props: { recent, trails } };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
