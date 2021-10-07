import { Container, Heading, Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBackIcon } from "@chakra-ui/icons";

const PageContainer = ({ children, image, title }) => (
  <Container
    textAlign="center"
    backgroundColor="blackAlpha.900"
    opacity="0.8"
    py="1em"
    borderRadius="1em"
  >
    <Heading as="h2">{title}</Heading>
    <Box my="1.2em" height="20vw" overflow="hidden">
      <Image src={image} alt="cover image" sizes="50vw" layout="responsive" />
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

export default PageContainer;
