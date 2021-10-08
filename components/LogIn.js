import PageContainer from "./PageContainer";
import { Stack, Input, Button } from "@chakra-ui/react";

const LogIn = () => (
  <PageContainer title="Log In">
    <Stack my="2em" px={["0", "2em", "4em"]} spacing={4}>
      <Input variant="flushed" placeholder="Email" isRequired />
      <Input
        variant="flushed"
        placeholder="Password"
        type="password"
        isRequired
      />
      <Button size="sm" type="submit">
        Login
      </Button>
    </Stack>
  </PageContainer>
);

export default LogIn;
