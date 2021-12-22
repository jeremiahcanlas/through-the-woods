import { Container, Text, Button, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import PageContainer from "./PageContainer";
import TextField from "./TextField";

import axios from "axios";
import * as Yup from "yup";

const CreateTrail = ({ cookies }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleCreate = async (values) => {
    const { title, location, description } = values;

    try {
      const res = await axios.post(
        "http://localhost:1337/trails",
        {
          title: title,
          location: location,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      router.push("/");
      // router.push(`/blogs/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = Yup.object({
    title: Yup.string().required("Title is Required"),
    location: Yup.string().required("Location is Required"),
    description: Yup.string().required("Description is Required"),
  });

  return (
    <PageContainer showImg={false} title="Create a Trail">
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
              <TextField
                placeholder="Descriptiob"
                name="description"
                textbox={true}
              />
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

export default CreateTrail;
