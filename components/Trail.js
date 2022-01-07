import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import PageContainer from "./PageContainer";
import { useSelector, useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import axios from "axios";
import { server } from "../server";

const Trail = ({ trail }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const userButtons = () => {
    if (trail.user.username === user.username) {
      return <Button onClick={() => deletePost()}>Delete</Button>;
    }
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const deletePost = async () => {
    try {
      await axios.delete(`${server}/trails/${trail.id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      dispatch(
        setAlert({
          msg: "Successfully deleted",
          alertType: "success",
        })
      );

      router.push("/trails");
    } catch (e) {
      dispatch(
        setAlert({
          msg: "Deleting failed",
          alertType: "error",
        })
      );
    }

    clearAlert();
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
