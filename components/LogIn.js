import PageContainer from "./PageContainer";
import { Stack, Input, Button, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "axios";

const LogIn = () => {
  const validateLogin = Yup.object({
    identifier: Yup.string().required("Username or Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    const { identifier, password } = values;

    try {
      const res = await axios.post(
        "http://localhost:1337/auth/local",
        {
          identifier: identifier,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // await router.push(`/profile/${res.data.user.username}`);
      console.log(res.data.user.username);
    } catch (error) {
      throw new Error("Username or Password invalid");
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
          onSubmit={handleLogin}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* {error && <Text>{error}</Text>} */}
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
