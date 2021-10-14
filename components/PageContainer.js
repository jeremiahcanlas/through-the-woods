import { Container, Heading, Box, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
// import { ArrowBackIcon } from "@chakra-ui/icons";
import defaultImage from "../public/about-pic.jpeg";
import { ImCross } from "react-icons/im";

const PageContainer = ({ children, image, title, showImg }) => (
  <Container
    textAlign="center"
    backgroundColor="blackAlpha.900"
    opacity="0.8"
    py="1em"
    borderRadius="1em"
  >
    <Box textAlign="left">
      <Link my="1.2em" href="/" passHref>
        <Button variant="ghost" size="sm" p="0.1em">
          <Icon as={ImCross} fontSize="1em" color="white" />
        </Button>
      </Link>
    </Box>
    <Heading as="h2">{title}</Heading>
    <Box
      my="1.2em"
      height="20vw"
      maxH="150px"
      overflow="hidden"
      display={!showImg ? "none" : "block"}
    >
      <Image src={image} alt="cover image" sizes="40vw" layout="responsive" />
    </Box>
    {children}
  </Container>
);

PageContainer.defaultProps = {
  image: defaultImage,
};

export default PageContainer;
