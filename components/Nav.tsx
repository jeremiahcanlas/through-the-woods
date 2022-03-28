import { Button, Stack, Text, useToast, Box } from "@chakra-ui/react";
import Link from "next/link";
import { IoIosLogIn, IoIosLogOut, IoIosCreate } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { GiMountaintop } from "react-icons/gi";
import { useSession, signOut } from "next-auth/react";
import styles from "../styles/Nav.module.scss";

const Nav = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const toast = useToast();

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      // dispatch(
      //   setAlert({
      //     msg: "Successfully Logged Out",
      //     alertType: "success",
      //   })
      // );

      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"#40916c"}
            padding="2em"
            mx="auto"
          >
            <Text color={"black"} fontWeight={"700"}>
              See ya friend 👋
            </Text>
            <Text color={"black"}>Successfully Logged Out</Text>
          </Box>
        ),
        duration: 3000,
      });
    } catch (e) {
      dispatch(
        setAlert({
          msg: "Error Logging Out, Try Again.",
          alertType: "error",
        })
      );
    }
    clearAlert();
  };

  return (
    <Stack
      direction={["column", "column", "row"]}
      justify="center"
      alignContent="center"
      px="1em"
      mt="3em"
      spacing={["3", "3", "1"]}
      className="nav-container"
    >
      <Link href="/trails" passHref>
        <Button
          p="0.8em"
          w={["90vw", "60vw", "15vw"]}
          borderColor="#40916c"
          variant="outline"
          letterSpacing="1px"
          fontWeight="500"
          textColor="white"
          rightIcon={<GiMountaintop size="1.2em" />}
          className={styles.btn}
        >
          TRAILS
        </Button>
      </Link>
      {session ? (
        <>
          <Link href="/trails/create" passHref>
            <Button
              p="0.8em"
              w={["90vw", "60vw", "15vw"]}
              borderColor="#40916c"
              variant="outline"
              letterSpacing="1px"
              fontWeight="500"
              textColor="white"
              rightIcon={<IoIosCreate size="1.2em" />}
              className={styles.btn}
            >
              CREATE
            </Button>
          </Link>
          <Button
            p="0.8em"
            w={["90vw", "60vw", "15vw"]}
            borderColor="#40916c"
            variant="outline"
            letterSpacing="1px"
            fontWeight="500"
            _focus={{ outline: "none" }}
            onClick={logout}
            textColor="red.300"
            rightIcon={<IoIosLogOut />}
            className={styles.btn}
          >
            LOG OUT
          </Button>
        </>
      ) : (
        <Link href="/login" passHref>
          <Button
            p="0.8em"
            w={["90vw", "60vw", "15vw"]}
            borderColor="#40916c"
            variant="outline"
            letterSpacing="1px"
            fontWeight="500"
            _focus={{ outline: "none" }}
            textColor="white"
            rightIcon={<IoIosLogIn />}
            className={styles.btn}
          >
            LOG IN
          </Button>
        </Link>
      )}
    </Stack>
  );
};

export default Nav;
