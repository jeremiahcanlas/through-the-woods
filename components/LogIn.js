import PageContainer from "./PageContainer";
import { useState, useEffect } from "react";
import { Stack, Button, Container, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "axios";

const LogIn = () => {
  const [apiError, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [apiError]);

  const validateLogin = Yup.object({
    identifier: Yup.string().required("Username or Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const { identifier, password } = values;

    try {
      await axios.post("/api/login", {
        identifier: identifier,
        password: password,
      });
    } catch (error) {
      setErrorMsg("Username or Password invalid");
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
            <Form onSubmit={handleSubmit}>
              {apiError && (
                <Text color="red.300" fontSize="0.8em">
                  {apiError}
                </Text>
              )}
              <Stack my="2em" px={["0", "2em", "4em"]} spacing={8}>
                <TextField
                  placeholder="Email or Username"
                  name="identifier"
                  apiError={apiError}
                />
                <TextField
                  placeholder="Password"
                  name="password"
                  type="password"
                  apiError={apiError}
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
