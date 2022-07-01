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
      duration <= trails.durationStats.total && setDuration(duration + 100000);
    }, 1 / 100);

    counter;

    return () => {
      clearInterval(counter);
    };
  }, [duration]);

  return (
    <PageContainer>
      <Container height="100vh" width="100%">
        <Heading>Statistics</Heading>
        <Flex
          direction="column"
          justifyContent={"space-between"}
          alignContent="space-between"
          marginTop="1em"
          height="60%"
          width="100%"
        >
          <Box
            border={"1px solid white"}
            borderRadius={"2px"}
            padding="1em"
            textAlign="center"
          >
            <Text fontSize="1.5em" fontWeight={700}>
              Total Elevation
            </Text>
            <Text fontSize="1.5em">
              <CountUp end={trails.elevationStats.total} /> m
            </Text>
            <Flex width={"100%"} justifyContent="space-between">
              <Box>
                <Text>Avg</Text>
                <Text>{trails.elevationStats.average} m</Text>
              </Box>
              <Box>
                <Text>Best</Text>
                <Text>{trails.elevationStats.best.title}</Text>
                <Text>{trails.elevationStats.best.elevation} m</Text>
              </Box>
            </Flex>
          </Box>
          <Box
            border={"1px solid white"}
            borderRadius={"2px"}
            padding="1em"
            textAlign="center"
          >
            <Text fontSize="1.5em" fontWeight={700}>
              Total Distance
            </Text>
            <Text fontSize="1.5em">
              <CountUp end={trails.distanceStats.total} /> km
            </Text>
            <Flex width={"100%"} justifyContent="space-between">
              <Box>
                <Text>Avg</Text>
                <Text>{trails.distanceStats.average} m</Text>
              </Box>
              <Box>
                <Text>Best</Text>
                <Text>{trails.distanceStats.best.title}</Text>
                <Text>{trails.distanceStats.best.distance} km</Text>
              </Box>
            </Flex>
          </Box>
          <Box
            border={"1px solid white"}
            borderRadius={"2px"}
            padding="1em"
            textAlign="center"
          >
            <Text fontSize="1.5em" fontWeight={700}>
              Total Duration
            </Text>
            <Text fontSize="1.5em">
              {humanize(duration, { units: ["h", "m"], maxDecimalPoints: "0" })}
            </Text>
            <Flex width={"100%"} justifyContent="space-between">
              <Box>
                <Text>Best</Text>
                <Text>{trails.durationStats.best.title}</Text>
                <Text>{humanize(trails.durationStats.best.duration)}</Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </PageContainer>
  );
};

export default Stats;
