import { Container, Button, Stack, Wrap, WrapItem } from "@chakra-ui/react";
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
import Image from "next/image";
import { server } from "../server";

const EditTrail = ({ trail, cookies }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  //delete trail
  const deletePost = async () => {
    try {
      await axios.post(`/api/trail/delete`, {
        id: trail.id,
        jwt: cookies.jwt,
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
    const { title, location, description, deleted } = values;

    try {
      let files = [];

      //if there are uploaded images then
      if (images.length >= 1) {
        console.log(images);
        const data = new FormData();
        images.forEach((img) => {
          return data.append("files", img);
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

      await trail.images.forEach((img) => {
        if (!deleted.includes(img.id)) {
          files.push(img.id);
        }
        //if all images are deleted then will just return empty
      });

      const json = JSON.stringify({
        title: title,
        location: location,
        description: description,
        id: trail.id,
        images: files,
        jwt: cookies.jwt,
        deleted,
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

  return (
    <PageContainer showImg={false} title="Edit Trail">
      <Container p="0">
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
              <input
                type="file"
                name="images"
                onChange={(e) => {
                  setImages([...images, ...e.target.files]);
                }}
                multiple
              />
              {/* <UploadFile /> */}
              <TextField name="description" textbox={true} />
              {trail.images && (
                <Wrap my="1em" spacing="20px">
                  {trail.images.map((img) => {
                    return (
                      <WrapItem position="relative" key={img.id}>
                        <TextField
                          name="deleted"
                          checkbox={true}
                          value={img.id}
                        />
                        <Image
                          src={img.formats.small.url}
                          alt="picture"
                          height="130px"
                          width="130px"
                        />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              )}
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
};

export default EditTrail;
