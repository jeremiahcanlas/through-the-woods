import { Container, Text, Input, Button } from "@chakra-ui/react";
import PageContainer from "./PageContainer";
import { Formik, Field, Form } from "formik";
import TextField from "./TextField";
import axios from "axios";
import * as Yup from "yup";

const RegisterForm = () => {
  const validateForm = Yup.object({
    firstName: Yup.string()
      .required("First Name is Required")
      .max(15, "Must be 15 character or less"),
    lastName: Yup.string()
      .required("Last Name is Required")
      .max(15, "Must be 15 character or less"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email homie"),
    password: Yup.string()
      .required("Password is required!")
      .min(5, "Password must be 5 characters or more"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Both passwords must match")
      .required("Please confirm password!"),
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
          onSubmit={async (values, { setSubmitting }) => {
            const { firstName, lastName, email, username, password } = values;

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
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            errors,
            touched,
            validateOnBlur,
            validate,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
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
