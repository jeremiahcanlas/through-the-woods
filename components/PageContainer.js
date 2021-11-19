import { Container, Heading, Box, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../public/about-pic.jpeg";
import { ImCross } from "react-icons/im";

const PageContainer = ({ children, image, title, showImg }) => (
  <Container
    textAlign="center"
    backgroundColor="blackAlpha.800"
    opacity="1"
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
      position="relative"
    >
      <Image src={image} alt="cover image" sizes="40vw" layout="responsive" />
    </Box>
    {children}
  </Container>
);

PageContainer.defaultProps = {
  image: defaultImage,
  showImg: true,
};

export default PageContainer;
