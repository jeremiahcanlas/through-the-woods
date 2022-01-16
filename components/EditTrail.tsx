import {
  Container,
  Button,
  Stack,
  Text,
  Box,
  Wrap,
  WrapItem,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";

import PageContainer from "./PageContainer";
import TextField from "./TextField";

import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";

const EditTrail = ({ trail, cookies }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const handleCreate = async (values) => {
    const { title, location, description, deleted } = values;

    console.log(deleted); //deleted array isnt being used but only displaying ids of chosen deleted images
    // console.log(trail.images);
    try {
      const data = new FormData();
      images.forEach((img) => {
        return data.append("files", img);
      });

      //uploads images to strapi media library
      const res = await axios.post("http://localhost:1337/upload", data, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });

      let files = [];
      // trail.images.forEach(id => {

      // })
      //this sets the image id in an array
      await res.data.forEach((file) => {
        files.push(file.id);
        console.log(files);
      });

      const json = JSON.stringify({
        title: title,
        location: location,
        description: description,
        id: trail.id,
        images: files,
        jwt: cookies.jwt,
      });
      try {
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
    } catch (e) {
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
              <TextField name="description" textbox={true} />
              {trail.images && (
                <Wrap my="1em" spacing="20px" align="center">
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
                          height="140px"
                          width="140px"
                        />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              )}
              <Stack direction="row" justifyContent="space-between">
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  size="lg"
                  type="submit"
                >
                  Update
                </Button>
                {/* <Button
                  size="sm"
                  colorScheme="red"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  CLEAR
                </Button> */}
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
