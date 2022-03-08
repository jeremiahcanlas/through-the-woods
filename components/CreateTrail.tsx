import {
  Container,
  Button,
  Stack,
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
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
    const { title, location, type, distance, description } = values;

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
    type: Yup.string().required("Trail Type is Required"),
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
            type: "",
            distance: 0,
            elevation: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            description: "",
          }}
          validationSchema={validateForm}
          onSubmit={handleCreate}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleReset,
            values,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextField placeholder="Title" name="title" />
              <TextField placeholder="Location" name="location" />
              <Stack direction={"row"} spacing="2" mb="3">
                <TextField placeholder="Trail type" name="type" />
              </Stack>
              <Stack direction={"row"} spacing="6em" my="2em">
                <Box>
                  <Heading fontSize={"1em"} mb="1em">
                    Distance (km)
                  </Heading>
                  {/* <TextField numField name="distance" element={"km"} /> */}
                  <NumberInput
                    maxW={"8em"}
                    defaultValue={0}
                    variant={"flushed"}
                    size="md"
                    min={0}
                    name="distance"
                    onChange={(e) => setFieldValue("distance", e)}
                  >
                    <NumberInputField />
                    {
                      // eslint-disable-next-line react/no-children-prop
                      <InputRightElement fontWeight={700} children={"km"} />
                    }
                  </NumberInput>
                </Box>
                <Box>
                  <Heading fontSize={"1em"} mb="1em">
                    Elevation (m)
                  </Heading>
                  {/* <TextField numField name="elevation" element={"m"} /> */}
                  <NumberInput
                    maxW={"8em"}
                    defaultValue={0}
                    variant={"flushed"}
                    size="md"
                    min={0}
                    name="elevation"
                    onChange={(e) => setFieldValue("elevation", e)}
                  >
                    <NumberInputField />
                    {
                      // eslint-disable-next-line react/no-children-prop
                      <InputRightElement fontWeight={700} children={"m"} />
                    }
                  </NumberInput>
                </Box>
              </Stack>
              <Box my="2em">
                <Heading fontSize={"1em"} mb="1em">
                  Trail Length
                </Heading>
                <Stack direction={"row"} spacing="0">
                  <NumberInput
                    maxW={"8em"}
                    variant={"flushed"}
                    size="md"
                    min={0}
                    name="days"
                    onChange={(e) => setFieldValue("days", e)}
                  >
                    <NumberInputField placeholder="days" />
                  </NumberInput>
                  <NumberInput
                    maxW={"8em"}
                    variant={"flushed"}
                    size="md"
                    min={0}
                    max={23}
                    name="hours"
                    onChange={(e) => setFieldValue("hours", e)}
                  >
                    <NumberInputField placeholder="hours" />
                  </NumberInput>
                  <NumberInput
                    maxW={"8em"}
                    variant={"flushed"}
                    size="md"
                    min={0}
                    max={59}
                    name="minutes"
                    onChange={(e) => setFieldValue("minutes", e)}
                  >
                    <NumberInputField placeholder="minutes" />
                  </NumberInput>
                </Stack>
              </Box>

              <TextField name="description" textbox placeholder="Description" />
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
