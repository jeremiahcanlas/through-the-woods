import { Container, Heading, Text, Button, Box } from "@chakra-ui/react";
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
      return (
        <>
          <Button
            m="1em"
            backgroundColor={"red.500"}
            _hover={{ backgroundColor: "red.300" }}
            onClick={() => deletePost()}
          >
            Delete
          </Button>
          <Link href={`/trails/${trail.id}/edit`} passHref>
            <Button m="1em">Edit</Button>
          </Link>
        </>
      );
    }
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const deletePost = async () => {
    try {
      // await axios.delete(`${server}/trails/${trail.id}`, {
      //   headers: {
      //     Authorization: `Bearer ${user.jwt}`,
      //   },
      // });
      await axios.post(`/api/trail/delete`, {
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
        <Link href="/trails" passHref>
          <Button mt="1em">&larr; All trails</Button>
        </Link>
        {userButtons()}
      </Container>
    </PageContainer>
  );
};

export default Trail;
