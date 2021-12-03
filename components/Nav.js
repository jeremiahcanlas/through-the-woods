import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { IoIosLogIn, IoIosLogOut, IoIosCreate } from "react-icons/io";
import { GiMountaintop } from "react-icons/gi";

const Nav = ({ isLoggedIn }) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack
      direction={["column", "row"]}
      justify="center"
      alignContent="center"
      px="1em"
      mt="3em"
      spacing={["3", "1"]}
      className="nav-container"
    >
      <Link href="/blogs" passHref>
        <Button
          p="0.8em"
          w={["100%", "70vw", "15vw"]}
          borderColor="#40916c"
          variant="outline"
          fontWeight="300"
          textColor="white"
          _hover={{
            textColor: "blackAlpha.800",
            backgroundColor: "whiteAlpha.500",
          }}
          rightIcon={<GiMountaintop size="1.2em" />}
        >
          BLOGS
        </Button>
      </Link>
      {isLoggedIn ? (
        <>
          <Link href="/blogs/create" passHref>
            <Button
              p="0.8em"
              w={["100%", "70vw", "15vw"]}
              borderColor="#40916c"
              variant="outline"
              fontWeight="300"
              textColor="white"
              _hover={{
                textColor: "blackAlpha.800",
                backgroundColor: "whiteAlpha.500",
              }}
              rightIcon={<IoIosCreate size="1.2em" />}
            >
              CREATE
            </Button>
          </Link>
          <Button
            p="0.8em"
            w={["100%", "70vw", "15vw"]}
            borderColor="#40916c"
            variant="outline"
            fontWeight="300"
            _focus={{ outline: "none" }}
            onClick={logout}
            textColor="red.300"
            _hover={{
              textColor: "blackAlpha.800",
              backgroundColor: "whiteAlpha.500",
            }}
            rightIcon={<IoIosLogOut />}
          >
            LOG OUT
          </Button>
        </>
      ) : (
        <Link href="/login" passHref>
          <Button
            p="0.8em"
            w={["100%", "70vw", "15vw"]}
            borderColor="#40916c"
            variant="outline"
            fontWeight="300"
            _focus={{ outline: "none" }}
            textColor="white"
            _hover={{
              textColor: "blackAlpha.800",
              backgroundColor: "whiteAlpha.500",
            }}
            rightIcon={<IoIosLogIn />}
          >
            LOG IN
          </Button>
        </Link>
      )}
    </Stack>
  );
};

export default Nav;
