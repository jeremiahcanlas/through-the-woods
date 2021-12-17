import PageContainer from "./PageContainer";
import { useRouter } from "next/router";
import { Stack, Button, Container, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { login } from "../features/user";

const LogIn = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const validateLogin = Yup.object({
    identifier: Yup.string().required("Username or Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const handleSubmit = async (values) => {
    const { identifier, password } = values;

    try {
      const res = await axios.post("/api/login", {
        identifier: identifier,
        password: password,
      });

      dispatch(
        login({
          username: res.data.user.username,
          jwt: res.data.jwt,
        })
      );

      dispatch(
        setAlert({
          msg: `Welcome ${res.data.user.username}`,
          alertType: "success",
        })
      );

      router.push("/");
    } catch (error) {
      dispatch(
        setAlert({
          msg: "Incorrect username or password",
          alertType: "error",
        })
      );
    }

    clearAlert();
  };

  return (
    <PageContainer>
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
              <Stack my="2em" px={["0", "2em", "4em"]} spacing={8}>
                <Heading as="h2">Login</Heading>

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
