import { Container, Text, Button, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import PageContainer from "./PageContainer";
import TextField from "./TextField";

import axios from "axios";
import * as Yup from "yup";

const CreateBlog = ({ cookies }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleCreate = async (values) => {
    const { title, location, body } = values;

    try {
      const res = await axios.post(
        "http://localhost:1337/blogs",
        {
          title: title,
          location: location,
          body: body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      router.push(`/blogs/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = Yup.object({
    title: Yup.string().required("Title is Required"),
    location: Yup.string().required("Location is Required"),
    body: Yup.string().required("Body is Required"),
  });

  return (
    <PageContainer showImg={false} title="Create a Blog">
      <Container p="0">
        <Formik
          initialValues={{
            title: "",
            location: "",
            body: "",
          }}
          validationSchema={validateForm}
          onSubmit={handleCreate}
        >
          {({ isSubmitting, handleSubmit, handleReset }) => (
            <Form onSubmit={handleSubmit}>
              {error && <Text>{error}</Text>}
              <TextField placeholder="Title" name="title" />
              <TextField placeholder="Location" name="location" />
              <TextField placeholder="Body" name="body" textbox={true} />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  size="lg"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  CLEAR
                </Button>
              </Stack>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default CreateBlog;
