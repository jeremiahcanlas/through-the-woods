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
            name: "",
            followers: 0,
            following: 0,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            // setTimeout(() => {
            //   console.log({ data: JSON.stringify(data) });
            //   setSubmitting(false);
            // }, 3000);
            const { name, followers, following } = values;

            console.log(name);
            await axios.post(
              "http://localhost:1337/hikers",
              {
                name: name,
                followers: followers,
                following: following,
                uuid: name.split(" ").join("-"),
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
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Field
                placeholder="name"
                name="name"
                variant="flushed"
                type="input"
                as={Input}
              />
              <Field
                name="followers"
                variant="flushed"
                type="input"
                as={Input}
              />
              <Field
                name="following"
                variant="flushed"
                type="input"
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
