import { Text } from "@chakra-ui/react";
import PageContainer from "./PageContainer";
import Image from "../public/about-pic.jpeg";

const About = () => (
  <PageContainer image={Image} title="About">
    <Text>
      Hello Everyone! Welcome to our official hiking blog page. You will see
      articles about our hiking journeys all across the world
    </Text>
  </PageContainer>
);

export default About;
