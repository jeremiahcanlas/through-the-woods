import PageContainer from "./PageContainer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Stack, Button, Container, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "axios";

const LogIn = () => {
  const [message, setMessage] = useState({
    text: "",
    color: "",
  });
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({
        text: "",
        color: "",
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const validateLogin = Yup.object({
    identifier: Yup.string().required("Username or Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const { identifier, password } = values;

    try {
      const res = await axios.post("/api/login", {
        identifier: identifier,
        password: password,
      });

      setMessage({
        text: `Welcome ${res.data.user.username}`,
        color: "green.400",
      });
      router.push("/");
    } catch (error) {
      setMessage({
        text: "Incorrect username or password",
        color: "red.300",
      });
    }
  };

  return (
    <PageContainer title="Log In">
      <Container>
        <Formik
          initialValues={{
            identifier: "",
            password: "",
          }}
          validationSchema={validateLogin}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit} method="POST">
              {message && (
                <Text color={message.color} fontSize="0.8em">
                  {message.text}
                </Text>
              )}
              <Stack my="2em" px={["0", "2em", "4em"]} spacing={8}>
                <TextField placeholder="Email or Username" name="identifier" />
                <TextField
                  placeholder="Password"
                  name="password"
                  type="password"
                />
                <Button isLoading={isSubmitting} size="sm" type="submit">
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default LogIn;
