import { Heading, Box } from "@chakra-ui/react";
import Link from "next/link";

const PageContainer = ({ children, title }) => (
  <Box
    maxH="100%"
    minH="100vh"
    maxW="100%"
    textAlign="left"
    opacity="1"
    mb="1.5rem"
  >
    <Box
      position="sticky"
      top="0"
      zIndex={100}
      bgGradient="linear-gradient(to-t,rgba(14,17,23,0),rgba(14,17,23, 1) 40%)"
    >
      <Link href="/" passHref>
        <Heading
          fontSize={["1em", "1.5em"]}
          bgGradient="linear(to-t, #2d6a4f 30%,#40916c 70%)"
          bgClip="text"
          letterSpacing="0.1em"
          fontWeight="700"
          p="1rem 1.5rem"
          cursor="pointer"
          display="inline-block"
        >
          THROUGH THE WOODS
        </Heading>
      </Link>
    </Box>

    <Box maxH="100%" minH="100vh" mt="2rem">
      {title && (
        <Heading as="h2" fontSize="2rem" letterSpacing="2px">
          {title}
        </Heading>
      )}

      {children}
    </Box>
  </Box>
);

PageContainer.defaultProps = {
  showImg: true,
  title: "",
};

export default PageContainer;
