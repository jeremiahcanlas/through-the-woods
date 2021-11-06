import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

const Nav = () => (
  <Stack
    // flexDirection={["column", "row"]}
    direction={["column", "row"]}
    justify="center"
    alignContent="center"
    p="none"
    mt="2em"
    spacing={["3", "1"]}
    className="nav-container"
  >
    <Link href="/login" passHref>
      <Button
        p="0.8em"
        w={["100%", "70vw", "15vw"]}
        borderColor="#40916c"
        variant="outline"
        fontWeight="300"
        _focus={{ outline: "none" }}
      >
        LOG IN
      </Button>
    </Link>
    <Link href="/blogs" passHref>
      <Button
        p="0.8em"
        w={["100%", "70vw", "15vw"]}
        borderColor="#40916c"
        variant="outline"
        fontWeight="300"
      >
        BLOGS
      </Button>
    </Link>
    <Link href="/profiles" passHref>
      <Button
        p="0.8em"
        w={["100%", "70vw", "15vw"]}
        borderColor="#40916c"
        variant="outline"
        fontWeight="300"
      >
        USERS
      </Button>
    </Link>
    <Link href="/register" passHref>
      <Button
        p="0.8em"
        w={["100%", "70vw", "15vw"]}
        borderColor="#40916c"
        variant="outline"
        fontWeight="300"
      >
        Register
      </Button>
    </Link>
    {/* <Link href="/about" passHref>
      <Button
        p="0.8em"
        w={["80vw", "70vw", "15vw"]}
        borderColor="#40916c"
        variant="outline"
        fontWeight="300"
      >
        ABOUT US
      </Button>
    </Link>
    <Button
      p="0.8em"
      w={["80vw", "70vw", "15vw"]}
      borderColor="#40916c"
      variant="outline"
      fontWeight="300"
    >
      CONTACT
    </Button> */}
  </Stack>
);

export default Nav;
