import { Container, Heading, Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBackIcon } from "@chakra-ui/icons";
import defaultImage from "../public/about-pic.jpeg";

const PageContainer = ({ children, image, title, showImg }) => (
  <Container
    textAlign="center"
    backgroundColor="blackAlpha.900"
    opacity="0.8"
    py="1em"
    borderRadius="1em"
  >
    <Heading as="h2">{title}</Heading>
    <Box
      my="1.2em"
      height="20vw"
      maxH="150px"
      overflow="hidden"
      display={showImg || "block"}
    >
      <Image src={image} alt="cover image" sizes="40vw" layout="responsive" />
    </Box>
    {children}
    <Box textAlign="left">
      <Link my="1.2em" href="/" passHref>
        <Button leftIcon={<ArrowBackIcon />} variant="outline" size="md">
          Go back
        </Button>
      </Link>
    </Box>
  </Container>
);

PageContainer.defaultProps = {
  image: defaultImage,
};

export default PageContainer;
