import { Container, Text, Input, Button } from "@chakra-ui/react";
import PageContainer from "./PageContainer";
import { Formik, Field } from "formik";
import axios from "axios";

const RegisterForm = () => {
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
          onSubmit={async (values, { setSubmitting }) => {
            // setTimeout(() => {
            //   console.log({ data: JSON.stringify(data) });
            //   setSubmitting(false);
            // }, 3000);
            const { firstName, lastName, email, username, password, confirm } =
              values;

            if (password === confirm) {
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
            } else {
              throw new Error("Passwords do not match");
            }
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Field
                placeholder="First Name"
                name="firstName"
                variant="flushed"
                type="input"
                as={Input}
              />
              <Field
                placeholder="Last Name"
                name="lastName"
                variant="flushed"
                type="input"
                as={Input}
              />
              <Field
                placeholder="Username"
                name="username"
                variant="flushed"
                type="input"
                as={Input}
              />
              <Field
                placeholder="Email"
                name="email"
                variant="flushed"
                type="email"
                as={Input}
              />
              <Field
                placeholder="Password"
                name="password"
                variant="flushed"
                type="password"
                as={Input}
              />
              <Field
                placeholder="Confirm Password"
                name="confirm"
                variant="flushed"
                type="password"
                as={Input}
              />
              <div />
              <Button disabled={isSubmitting} size="sm" type="submit">
                Submit
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default RegisterForm;
