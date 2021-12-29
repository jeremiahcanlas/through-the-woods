import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ImPencil2 } from "react-icons/im";

import accentImage from "../public/blogs-pic.jpg";
import PageContainer from "./PageContainer";

const Trails = ({ trails }) => {
  const isLoggedIn = useSelector((state) =>
    state.user.username ? true : false
  );

  return (
    <PageContainer image={accentImage} title="Trails">
      <Flex direction="column" p="0" my="1em" justifyContent="center">
        {isLoggedIn && (
          <Link href={`/trails/create`} passHref>
            {/* <Box
              p="1em"
              borderRadius="1em"
              backgroundColor="blackAlpha.900"
              my="0.5em"
              _hover={{ backgroundColor: "#343a40" }}
              cursor="pointer"
              textAlign="center"
              opacity="0.5"
              direction="row"
            >
              <ImPencil2 />
              <Heading fontSize={["1em", "1.2em"]} direction="row">
                New trail
              </Heading>
            </Box> */}

            <Button
              p="1em"
              borderColor="#40916c"
              variant="outline"
              fontWeight="300"
              textColor="white"
              _hover={{
                textColor: "blackAlpha.800",
                backgroundColor: "whiteAlpha.500",
              }}
              leftIcon={<ImPencil2 />}
            >
              New trail
            </Button>
          </Link>
        )}
        {trails.map((trail) => (
          <Link href={`/trails/${trail.id}`} key={trail.id} passHref>
            <Box
              p="1em"
              borderRadius="1em"
              backgroundColor="blackAlpha.900"
              my="0.5em"
              _hover={{ backgroundColor: "#343a40" }}
              cursor="pointer"
              textAlign="left"
              opacity="0.5"
            >
              <Heading fontSize={["1em", "1.2em"]}>{trail.title}</Heading>
            </Box>
          </Link>
        ))}
      </Flex>
    </PageContainer>
  );
};

export default Trails;
