import PageContainer from "./PageContainer";
import { useRouter } from "next/router";
import {
  Stack,
  Text,
  Button,
  Box,
  Container,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { setAlert, removeAlert } from "../features/alert";
import { signIn, getSession } from "next-auth/react";
import _ from "lodash";

const LogIn = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  // const clearAlert = () => {
  //   setTimeout(() => {
  //     dispatch(removeAlert());
  //   }, 3000);
  // };

  const handleSubmit = async (values) => {
    const { identifier, password } = values;

    try {
      await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });

      const session = await getSession();

      // dispatch(
      //   setAlert({
      //     msg: `Welcome ${session.username}`,
      //     alertType: "success",
      //   })
      // );

      toast({
        position: "top",
        title: `Hello, ${_.get(session, "username")}!`,
        // isClosable: session.username !== "guest" ? false : true,
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"#40916c"}
            padding="2em"
            mx="auto"
          >
            {_.get(session, "username") !== "guest" ? (
              <>
                <Text color={"black"} fontWeight={"700"}>
                  Hello, {_.get(session, "username")}
                </Text>
                <Text color={"black"}>You successfully logged in.</Text>
              </>
            ) : (
              <>
                <Text color={"black"} fontWeight={"700"}>
                  Welcome to Through the Woods, Guest!
                </Text>
                <Text color={"black"}>
                  You have a special access to my website that allows you to
                  create 1 entry ONLY for testing purposes. Please report any
                  issues to https://github.com/jeremiahcanlas/through-the-woods.
                  Enjoy!
                </Text>
              </>
            )}
          </Box>
        ),
        duration: _.get(session, "username") !== "guest" ? 3000 : 6000,
      });

      router.push("/");
    } catch (error) {
      // dispatch(
      //   setAlert({
      //     msg: "Incorrect username or password",
      //     alertType: "error",
      //   })
      // );

      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"red.300"}
            padding="2em"
            mx="auto"
          >
            <Text color={"black"} fontWeight={"700"}>
              Incorrect username or password
            </Text>
            <Text color={"black"}>Or you probably dont exist</Text>
          </Box>
        ),
        duration: 3000,
      });
    }

    // clearAlert();
  };

  const validateLogin = Yup.object({
    identifier: Yup.string().required("Username or Email is Required"),
    password: Yup.string().required("Password is required"),
  });

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
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
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
                <Button
                  isLoading={isSubmitting}
                  size="sm"
                  type="submit"
                  onClick={() => {
                    setFieldValue("identifier", "guest");
                    setFieldValue("password", "ttwguest");
                  }}
                >
                  Login as Guest
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
