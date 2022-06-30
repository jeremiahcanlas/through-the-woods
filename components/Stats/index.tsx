import { Box, Container, Heading, Text, Flex } from "@chakra-ui/react";
import PageContainer from "../PageContainer";
import humanize from "humanize-duration";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import _ from "lodash";

const Stats = ({ trails }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const counter = setInterval(() => {
      duration <= trails.totalDuration && setDuration(duration + 100000);
    }, 1 / 100);

    counter;

    return () => {
      clearInterval(counter);
    };
  }, [duration, trails.totalDuration]);

  return (
    <PageContainer>
      <Container height="100vh" width="100%">
        <Heading>Statistics</Heading>
        <Flex
          direction="column"
          justifyContent={"space-between"}
          alignContent="space-between"
          marginTop="1em"
          height="40%"
          width="100%"
        >
          <Box border={"1px solid white"} padding="1em" textAlign="center">
            <Text fontSize="1.5em" fontWeight={700}>
              Total Elevation
            </Text>
            <Text fontSize="1.5em">
              <CountUp end={trails.totalElevation} /> m
            </Text>
          </Box>
          <Box border={"1px solid white"} padding="1em" textAlign="center">
            <Text fontSize="1.5em" fontWeight={700}>
              Total Distance
            </Text>
            <Text fontSize="1.5em">
              <CountUp end={trails.totalDistance} /> km
            </Text>
          </Box>
          <Box border={"1px solid white"} padding="1em" textAlign="center">
            <Text fontSize="1.5em" fontWeight={700}>
              Total Duration
            </Text>
            <Text fontSize="1.5em">
              {humanize(duration, { units: ["h", "m"], maxDecimalPoints: "0" })}
            </Text>
          </Box>
        </Flex>
      </Container>
    </PageContainer>
  );
};

export default Stats;
