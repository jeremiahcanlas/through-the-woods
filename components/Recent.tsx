import { Container, Stack, Text, Button } from "@chakra-ui/react";
import TrailBox from "./TrailBox";
import Link from "next/link";
import styles from "../styles/Trails.module.scss";

const Recent = ({ trails }) => {
  return (
    <Container
      h={"60vh"}
      borderRadius="0.5em"
      m="1em"
      maxW={["90%", "70%", "50%", "30%"]}
    >
      <Text fontSize={"2em"} fontStyle="bold" letterSpacing={"2px"}>
        Recently Added
      </Text>
      <Stack my="1em" spacing={"0.5em"}>
        {trails.map((trail: any) => {
          return <TrailBox key={trail.id} trail={trail} recent={true} />;
        })}
      </Stack>
      <Link href="/trails" passHref>
        <Button variant="outline" className={styles.btn}>
          View All Trails
        </Button>
      </Link>
    </Container>
  );
};

export default Recent;
