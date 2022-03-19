import {
  Container,
  Button,
  Stack,
  Heading,
  Box,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
// import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import PageContainer from "./PageContainer";
import TextField from "./TextField";
import UploadFile from "./UploadFile";
import { useSession } from "next-auth/react";

import axios from "axios";
import * as Yup from "yup";

import { server } from "../server";

const EditTrail = ({ trail }) => {
  const { data: session, status } = useSession();

  //uses next router
  const router = useRouter();
  //disptaches an action
  // const dispatch = useDispatch();
  const toast = useToast();

  //clears alert after 3s
  // const clearAlert = () => {
  //   setTimeout(() => {
  //     dispatch(removeAlert());
  //   }, 3000);
  // };

  //delete trail
  const deletePost = async () => {
    try {
      await axios.post(`/api/trail/delete`, {
        id: trail.id,
        jwt: session.jwt,
      });

      // dispatch(
      //   setAlert({
      //     msg: "Successfully deleted",
      //     alertType: "success",
      //   })
      // );
      router.push("/trails");

      toast({
        position: "top",
        // title: `Hello, ${session.username}!`,
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"#40916c"}
            padding="2em"
            width={"70vw"}
          >
            <Text color={"black"} fontWeight={"700"}>
              Trail Successfully Deleted
            </Text>
          </Box>
        ),
        duration: 3000,
      });
    } catch (e) {
      //   dispatch(
      //     setAlert({
      //       msg: "Deleting failed",
      //       alertType: "error",
      //     })
      //   );
      // }

      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"red.300"}
            padding="2em"
            width={"70vw"}
          >
            <Text color={"black"} fontWeight={"700"}>
              Deleting Error
            </Text>
            <Text color={"black"}>Try it again in a few...</Text>
          </Box>
        ),
        duration: 3000,
      });
    }

    // clearAlert();
  };

  const [images, setInitialImages] = useState(trail.images);

  //To submit edited file
  const handleCreate = async (values) => {
    const {
      title,
      location,
      description,
      difficulty,
      type,
      rating,
      distance,
      elevation,
      days,
      hours,
      minutes,
      url,
    } = values;

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
        difficulty: difficulty,
        type: type,
        rating: parseInt(rating),
        distance: parseInt(distance),
        elevation: parseInt(elevation),
        trailLength: {
          days: parseInt(days),
          hours: parseInt(hours),
          minutes: parseInt(minutes),
        },
        description: description,
        allTrailsUrl: url,
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

      // dispatch(
      //   setAlert({
      //     msg: "Successfully edited!",
      //     alertType: "success",
      //   })
      // );

      router.push(`/trails/${response.data.id}`);

      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"#40916c"}
            padding="2em"
            width={"70vw"}
          >
            <Text color={"black"} fontWeight={"700"}>
              Trail Successfully Updated
            </Text>
          </Box>
        ),
        duration: 3000,
      });
    } catch (error) {
      // dispatch(
      //   setAlert({
      //     msg: "Post error, try again.",
      //     alertType: "error",
      //   })
      // );

      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"red.300"}
            padding="2em"
            width={"70vw"}
          >
            <Text color={"black"} fontWeight={"700"}>
              Update Error
            </Text>
            <Text color={"black"}>Try it again in a few...</Text>
          </Box>
        ),
        duration: 3000,
      });
    }

    // clearAlert();
  };

  const validateForm = Yup.object({
    title: Yup.string().required("Title is Required"),
    location: Yup.string().required("Location is Required"),
    difficulty: Yup.string().required("Difficulty is Required"),
    type: Yup.string().required("Trail Type is Required"),
    distance: Yup.number(),
    elevation: Yup.number(),
    days: Yup.number(),
    hours: Yup.number().max(23),
    minutes: Yup.number().max(59),
    description: Yup.string().required("Description is Required"),
    url: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?alltrails.([a-z]+)\/(explore\/recording)/,
        "Enter valid AllTrails URL"
      )
      .required("URL required"),
  });

  //could easily be a separate file...
  const trailTypes = ["Loop", "Out & Back", "Point to Point"];
  const stars = [1, 2, 3, 4, 5];

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
              difficulty: trail.difficulty,
              type: trail.type,
              rating: trail.rating,
              distance: trail.distance,
              elevation: trail.elevation,
              days: trail.trailLength.days,
              hours: trail.trailLength.hours,
              minutes: trail.trailLength.minutes,
              description: trail.description,
              url: trail.allTrailsUrl,
              deleted: [],
            }}
            validationSchema={validateForm}
            onSubmit={handleCreate}
          >
            {({ isSubmitting, handleSubmit, values, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                {/* {error && <Text>{error}</Text>} */}
                <TextField placeholder="Title" name="title" />
                <TextField placeholder="Location" name="location" />
                <Box my="2em">
                  <Heading fontSize={"1em"} mb="1em">
                    Rating
                  </Heading>
                  <Stack direction={"row"}>
                    {stars.map((star) => (
                      <IconButton
                        key={star}
                        fontSize="2em"
                        variant={"ghost"}
                        aria-label="star"
                        onClick={() => setFieldValue("rating", star)}
                        icon={
                          values.rating >= star ? (
                            <AiFillStar color="rgb(221, 227, 146)" />
                          ) : (
                            <AiOutlineStar />
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Box>
                <Box my="2em">
                  <Heading fontSize={"1em"} mb="1em">
                    Difficulty
                  </Heading>
                  <TextField
                    selectField={["Easy", "Moderate", "Hard"]}
                    placeholder="Trail type"
                    name="difficulty"
                    defaultVal={values.difficulty}
                  />
                </Box>
                <Box my="2em">
                  <Heading fontSize={"1em"} mb="1em">
                    Route Type
                  </Heading>
                  <TextField
                    selectField={trailTypes}
                    placeholder="Trail type"
                    name="type"
                    defaultVal={values.type}
                  />
                </Box>
                <Stack direction={"row"} spacing="6em" my="2em">
                  <Box>
                    <Heading fontSize={"1em"} mb="1em">
                      Distance (km)
                    </Heading>

                    <NumberInput
                      maxW={"8em"}
                      defaultValue={values.distance}
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
                    <NumberInput
                      maxW={"8em"}
                      defaultValue={values.elevation}
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
                      defaultValue={values.days}
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
                      defaultValue={values.hours}
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
                      defaultValue={values.minutes}
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

                <TextField name="description" textbox={true} />
                <TextField placeholder="AllTrails URL" name="url" />

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
