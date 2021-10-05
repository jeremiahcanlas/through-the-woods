import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

const Nav = () => (
  <Stack
    // flexDirection={["column", "row"]}
    // justifyContent="center"
    direction={["column", "row"]}
    justify="center"
    mt="2em"
    mx="auto"
    spacing={["3", "1"]}
  >
    <Link href="/blogs" passHref>
      <Button
        p="0.8em"
        w={["80vw", "70vw", "15vw"]}
        border="2px"
        borderColor="#40916c"
        variant="ghost"
        fontWeight="300"
      >
        BLOGS
      </Button>
    </Link>
    <Link href="/about" passHref>
      <Button
        p="0.8em"
        w={["80vw", "70vw", "15vw"]}
        border="2px"
        borderColor="#40916c"
        variant="ghost"
        fontWeight="300"
      >
        ABOUT
      </Button>
    </Link>
    <Button
      p="0.8em"
      w={["80vw", "70vw", "15vw"]}
      border="2px"
      borderColor="#40916c"
      variant="ghost"
      fontWeight="300"
    >
      CONTACT
    </Button>
  </Stack>
);

export default Nav;
