import {
  Container,
  Button,
  Stack,
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";
import { useSession } from "next-auth/react";

import PageContainer from "./PageContainer";
import TextField from "./TextField";
import UploadFile from "./UploadFile";

import axios from "axios";
import * as Yup from "yup";
import { server } from "../server";

const CreateTrail = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  if (status === "loading") {
    return <p>Please Wait</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>NOT AUTHORIZED</p>;
  }

  const handleCreate = async (values) => {
    const { title, location, description } = values;

    try {
      let files = [];

      //will upload to strapi backend
      if (images.length >= 1) {
        const data = new FormData();

        images.forEach(async (img) => {
          return data.append("files", img.originFileObj);
        });

        // uploads images to strapi media library
        const res = await axios.post(`${server}/upload`, data, {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        });

        // this sets the image id in an array
        await res.data.forEach((file) => {
          files.push(file.id);
        });
      }

      const json = JSON.stringify({
        title: title,
        location: location,
        description: description,
        images: files,
        jwt: session.jwt,
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
    <PageContainer showImg={false}>
      <Container my="2em" textAlign={["start", "start", "center"]}>
        <Heading as="h2" fontSize="2rem" letterSpacing="2px">
          Create
        </Heading>
      </Container>
      <Container p={["0,2em", "0"]}>
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
              <TextField placeholder="Title" name="title" />
              <TextField placeholder="Location" name="location" />
              <Stack direction={"row"} spacing="2" mb="3">
                <InputGroup>
                  <Input placeholder="0" type="number" name="length" />
                  {
                    // eslint-disable-next-line react/no-children-prop
                    <InputRightElement children={"km"} />
                  }
                </InputGroup>

                <InputGroup>
                  <Input placeholder="Trail Type" type="number" name="length" />
                </InputGroup>
              </Stack>
              <Box>
                <Heading fontSize={"1em"} mb="1em">
                  Length
                </Heading>
                <Stack direction={"row"} spacing="0">
                  <InputGroup>
                    <Input placeholder="days" type="number" name="days" />
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="hours" type="number" name="hours" />
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="mins" type="number" name="minutes" />
                  </InputGroup>
                </Stack>
              </Box>

              <TextField
                name="description"
                textbox={true}
                placeholder="Description"
              />
              <Box my="2em">
                <Heading fontSize={"1em"} mb="1em">
                  Upload Images
                </Heading>
                <UploadFile images={images} setImages={setImages} />
              </Box>

              <Stack direction="row" justifyContent="space-between">
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  loadingText="Submitting"
                  // width={["95%", "30%"]}
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
