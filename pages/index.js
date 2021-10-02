import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Blog from "../components/Blog";
import { Container, Wrap } from "@chakra-ui/react";
import Header from "../components/Header";
import Nav from "../components/Nav";

// this is where we render all blog posts

export default function Home({ blogs }) {
  return (
    <Container maxW="container.xl" py="auto" my="auto">
      <Header />
      <Nav />
    </Container>
  );
}

Home.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/blogs");
  const blogs = await res.data;
  return { blogs };
};
