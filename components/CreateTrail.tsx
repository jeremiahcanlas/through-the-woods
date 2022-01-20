import { Container, Button, Stack, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";

import PageContainer from "./PageContainer";
import TextField from "./TextField";
import UploadFile from "./UploadFile";

import axios from "axios";
import * as Yup from "yup";
import { server } from "../server";

const CreateTrail = ({ cookies }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const handleCreate = async (values) => {
    const { title, location, description } = values;

    // console.log(images);

    try {
      let files = [];

      //will upload to strapi backend
      if (images.length >= 1) {
        const data = new FormData();

        images.forEach(async (img) => {
          return data.append("files", img.originFileObj);
        });

        //uploads images to strapi media library
        const res = await axios.post(`${server}/upload`, data, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });

        //this sets the image id in an array
        await res.data.forEach((file) => {
          files.push(file.id);
        });
      }

      const json = JSON.stringify({
        title: title,
        location: location,
        description: description,
        images: files,
        jwt: cookies.jwt,
      });

      const response = await axios.post("/api/trail/create", json, {
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

      router.push(`/trails/${response.data.id}`);
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
              {/* <input
                type="file"
                name="images"
                onChange={(e) => {
                  setImages([...images, ...e.target.files]);
                }}
                multiple
              /> */}
              <TextField name="description" textbox={true} />
              <Box my="2em">
                <UploadFile images={images} setImages={setImages} />
              </Box>

              <Stack direction="row" justifyContent="space-between">
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  loadingText="Submitting"
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
