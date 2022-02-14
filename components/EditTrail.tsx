import { Container, Button, Stack, Heading, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";

import PageContainer from "./PageContainer";
import TextField from "./TextField";
import UploadFile from "./UploadFile";
import { useSession } from "next-auth/react";

import axios from "axios";
import * as Yup from "yup";

import { server } from "../server";

const EditTrail = ({ trail }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setInitialImages] = useState(trail.images);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  // if (typeof window !== "undefined") return null;

  // if (status === "unauthenticated") {
  //   router.push("/");
  //   return <p>NOT AUTHORIZED</p>;
  // }

  //delete trail
  const deletePost = async () => {
    try {
      await axios.post(`/api/trail/delete`, {
        id: trail.id,
        jwt: session.jwt,
      });

      dispatch(
        setAlert({
          msg: "Successfully deleted",
          alertType: "success",
        })
      );

      router.push("/trails");
    } catch (e) {
      dispatch(
        setAlert({
          msg: "Deleting failed",
          alertType: "error",
        })
      );
    }

    clearAlert();
  };

  //To submit edited file
  const handleCreate = async (values) => {
    const { title, location, description } = values;

    try {
      let files = [];
      let newImages = await images.filter(
        (img) => img.provider !== "cloudinary"
      );
      let existingImages = await images.filter(
        (img) => img.provider === "cloudinary"
      );
      let deleted = await trail.images.filter(
        (img) => !existingImages.includes(img)
      );

      //if there are uploaded images then
      if (newImages.length >= 1) {
        const data = new FormData();
        newImages.forEach((img) => {
          return data.append("files", img.originFileObj);
        });

        //uploads images to strapi media library
        const res = await axios.post(`${server}/upload`, data, {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        });
        //this sets the image id in an array
        await res.data.forEach((file) => {
          files.push(file.id);
        });
      }

      await existingImages.forEach((img) => files.push(img.id));

      const json = JSON.stringify({
        title: title,
        location: location,
        description: description,
        id: trail.id,
        images: files,
        jwt: session.jwt,
        deleted: deleted,
      });

      const response = await axios.put("/api/trail/edit", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(
        setAlert({
          msg: "Successfully edited!",
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
    deleted: Yup.array(),
  });

  if (session) {
    return (
      <PageContainer showImg={false}>
        <Container my="2em" textAlign={["start", "start", "center"]}>
          <Heading as="h2" fontSize="2rem" letterSpacing="2px">
            Edit
          </Heading>
        </Container>
        <Container p={["0,2em", "0"]}>
          <Formik
            initialValues={{
              title: trail.title,
              location: trail.location,
              description: trail.description,
              deleted: [],
            }}
            validationSchema={validateForm}
            onSubmit={handleCreate}
          >
            {({ isSubmitting, handleSubmit, handleReset, values }) => (
              <Form onSubmit={handleSubmit}>
                {/* {error && <Text>{error}</Text>} */}
                <TextField placeholder="Title" name="title" />
                <TextField placeholder="Location" name="location" />

                <TextField name="description" textbox={true} />
                <Box my="2em">
                  <Heading fontSize={"1em"} mb="1em">
                    Upload Images
                  </Heading>
                  <UploadFile images={images} setImages={setInitialImages} />
                </Box>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  maxW="100%"
                  spacing="4em"
                >
                  <Button
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    loadingText="Updating"
                    width={["95%", "30%"]}
                    alignSelf={["center", "start"]}
                    size="lg"
                    type="submit"
                  >
                    Update
                  </Button>
                  <Button
                    backgroundColor={"red.500"}
                    maxW={["40%", "30%"]}
                    loadingText="Deleting"
                    _hover={{ backgroundColor: "red.300" }}
                    onClick={() => deletePost()}
                  >
                    Delete
                  </Button>
                </Stack>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>
        </Container>
      </PageContainer>
    );
  }
  return <p>NOT AUTHORIZED</p>;
};

export default EditTrail;
