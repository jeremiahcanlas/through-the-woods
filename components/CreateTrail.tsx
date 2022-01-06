import { Container, Button, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";

import PageContainer from "./PageContainer";
import TextField from "./TextField";

import axios from "axios";
import * as Yup from "yup";

const CreateTrail = ({ cookies }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const uploadImages = async () => {
    const data = new FormData();
    images.forEach((img) => {
      return data.append("files", img);
    });

    const res = await axios.post("http://localhost:1337/upload", data, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    console.log(res.data);
  };

  const handleCreate = async (values) => {
    const { title, location, description } = values;

    await uploadImages();

    const json = JSON.stringify({
      title: title,
      location: location,
      description: description,
      jwt: cookies.jwt,
    });

    try {
      const res = await axios.post("/api/trail/create", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(
        setAlert({
          msg: "Successfully posted!",
          alertType: "success",
        })
      );

      router.push(`/trails/${res.data.id}`);
    } catch (error) {
      dispatch(
        setAlert({
          msg: "Post error, try again.",
          alertType: "error",
        })
      );
    }

    clearAlert();
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
            description: "",
          }}
          validationSchema={validateForm}
          onSubmit={handleCreate}
        >
          {({ isSubmitting, handleSubmit, handleReset, values }) => (
            <Form onSubmit={handleSubmit}>
              {/* {error && <Text>{error}</Text>} */}
              <TextField placeholder="Title" name="title" />
              <TextField placeholder="Location" name="location" />
              {/* file upload here
              <TextField
                placeholder="Images"
                name="images"
                type="file"
                multiple={true}
              /> */}
              {/* <Field name={name}>

          <FormControl isInvalid={meta.error && meta.touched} my="6">
      
              <Input
                {...field}
                variant="flushed"
                id={name}
                placeholder={placeholder}
                type={type}
                multiple={multiple}
              />
        
            <FormErrorMessage fontSize="0.8em">{meta.error}</FormErrorMessage>
          </FormControl>
        
      
    </Field> */}
              <input
                type="file"
                name="images"
                onChange={(e) => {
                  setImages([...images, ...e.target.files]);
                }}
                multiple
              />
              <TextField name="description" textbox={true} />
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

              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default CreateTrail;
