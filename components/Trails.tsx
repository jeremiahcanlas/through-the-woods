import { Button, Container, Flex, Heading, Wrap } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlinePlusSquare } from "react-icons/ai";
import PageContainer from "./PageContainer";
import TrailBox from "./TrailBox";
import Map from "./Map";
import styles from "../styles/Trails.module.scss";
import Fade from "react-reveal/Fade";

import { useSession } from "next-auth/react";

const Trails = ({ trails, geojson }) => {
  const { data: session } = useSession();

  return (
    <PageContainer>
      <Flex direction="column" px="2em" my="1em" align={"center"}>
        <Container my="2em" textAlign={["start", "start", "center"]} p="0">
          <Heading as="h2" fontSize="2rem" letterSpacing="2px">
            Trails
          </Heading>
        </Container>

        <Container maxW={["100%", "95%"]} height={"35vh"} mx="0" p="0" my="1em">
          <Map trails={trails} geojson={geojson} />
        </Container>

        {session && (
          <Link href={`/trails/create`} passHref>
            <Button
              width={["100%", "70%", "50%"]}
              p="1px"
              borderColor="#40916c"
              variant="outline"
              letterSpacing="1px"
              fontWeight="500"
              textColor="white"
              leftIcon={<AiOutlinePlusSquare />}
              className={styles.btn}
            >
              New Trail
            </Button>
          </Link>
        )}
        <Wrap spacing={"0.5em"} my="2em" justify={"center"} width={"100%"}>
          <Fade ssrFadeout>
            {trails.map((trail) => {
              return <TrailBox key={trail.id} trail={trail} recent={false} />;
            })}
          </Fade>
        </Wrap>
      </Flex>
    </PageContainer>
  );
};

export default Trails;
