import { Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const NotFound = () => {
  const router = useRouter();

  const [time, setTime] = useState(3);

  useEffect(() => {
    let countDown = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(countDown);
  }, [time]);

  useEffect(() => {
    let redirect = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(redirect);
  }, []);
  return (
    <Container textAlign="center">
      <Text my="auto">
        I believe you are lost, friend <br /> Lets take you back home in {time}
        ...
      </Text>
    </Container>
  );
};

export default NotFound;
