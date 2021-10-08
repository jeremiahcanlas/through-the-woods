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
    <Button
      p="0.8em"
      w={["80vw", "70vw", "15vw"]}
      borderColor="#40916c"
      variant="outline"
      fontWeight="300"
      _focus={{ outline: "none" }}
    >
      LOG IN
    </Button>
    <Link href="/blogs" passHref>
      <Button
        p="0.8em"
        w={["80vw", "70vw", "15vw"]}
        borderColor="#40916c"
        variant="outline"
        fontWeight="300"
      >
        BLOGS
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
