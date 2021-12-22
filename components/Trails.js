import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

import accentImage from "../public/blogs-pic.jpg";
import PageContainer from "./PageContainer";

const Trails = ({ trails }) => (
  <PageContainer image={accentImage} title="Trails">
    <Flex direction="column" p="0" my="1em" justifyContent="center">
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

export default Trails;
