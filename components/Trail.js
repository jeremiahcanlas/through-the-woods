import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import PageContainer from "./PageContainer";
import { useSelector } from "react-redux";
import axios from "axios";

const Trail = ({ trail }) => {
  const user = useSelector((state) => state.user);

  const router = useRouter();

  const userButtons = () => {
    if (trail.user.username === user.username) {
      return <Button onClick={() => deletePost()}>Delete</Button>;
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:1337/trails/${trail.id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      // router.push("/");
      router.push("/trails");
    } catch (e) {
      console.log("error");
    }
  };

  return (
    <PageContainer>
      <Container maxW="100vw" p="0" m="0">
        <Heading mb="1em">{trail.title}</Heading>
        <Text>by {trail.user.username}</Text>
        <ReactMarkdown>{trail.description}</ReactMarkdown>
        <Button mt="1em">
          <Link href="/trails" passHref>
            &larr; All trails
          </Link>
        </Button>
        {userButtons()}
      </Container>
    </PageContainer>
  );
};

export default Trail;
