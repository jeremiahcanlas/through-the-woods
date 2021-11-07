import { Container, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Formik, Form } from "formik";

import PageContainer from "./PageContainer";
import TextField from "./TextField";

import axios from "axios";
import * as Yup from "yup";

const RegisterForm = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  const router = useRouter();

  const validateForm = Yup.object({
    firstName: Yup.string()
      .required("First Name is Required")
      .min(2, "Must be 2 character or longer"),
    lastName: Yup.string()
      .required("Last Name is Required")
      .min(2, "Must be 2 character or longer"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be 5 characters or more"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Both passwords must match")
      .required("Please confirm password"),
  });

  return (
    <PageContainer showImg={false} title="Register">
      <Container>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirm: "",
          }}
          validationSchema={validateForm}
          onSubmit={async (values) => {
            const { firstName, lastName, email, username, password } = values;

            try {
              await axios.post(
                "http://localhost:1337/profiles",
                {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  username: username,
                  password: password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              await router.push(`/profile/${username}`);
            } catch (error) {
              let users = await axios.get("http://localhost:1337/profiles");

              if (
                users.data.filter((user) => user.username === username).length >
                0
              ) {
                setError("username already exists");
              }

              if (
                users.data.filter((user) => user.email === email).length > 0
              ) {
                setError("email already exists");
              }
            }
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            touched,
            validateOnBlur,
            validate,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              {error && <Text>{error}</Text>}
              <TextField placeholder="First Name" name="firstName" />
              <TextField placeholder="Last Name" name="lastName" />
              <TextField placeholder="Username" name="username" />
              <TextField placeholder="Email" name="email" type="email" />
              <TextField
                placeholder="Password"
                name="password"
                type="password"
              />
              <TextField
                placeholder="Confirm Password"
                name="confirm"
                type="password"
              />

              <Button isLoading={isSubmitting} size="sm" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default RegisterForm;
