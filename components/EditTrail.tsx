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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
// import { setAlert, removeAlert } from "../features/alert";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import PageContainer from "./PageContainer";
import TextField from "./TextField";
import UploadFile from "./UploadFile";
import { useSession } from "next-auth/react";
import humanizeDuration from "humanize-duration";
import _ from "lodash";

import axios from "axios";
import * as Yup from "yup";

import { server } from "../server";

const EditTrail = ({ trail }) => {
  const { data: session, status } = useSession();
  const [serverUrl, setUrl] = useState();

  useEffect(() => {
    setUrl(serverUrl);
  }, []);

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
        jwt: _.get(session, "jwt"),
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
          <Box borderRadius={"0.3em"} backgroundColor={"#40916c"} padding="2em">
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
            mx="auto"
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
  const [sliderValue, setSliderValue] = useState(
    humanizeDuration(trail.duration, { delimiter: " and ", round: true })
  );
  const [duration, setDuration] = useState(trail.duration);

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
      url,
    } = values;

    console.log("IMAGES", images, _.get(session, "jwt"), serverUrl);

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
            Authorization: `Bearer ${_.get(session, "jwt")}`,
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
        duration: duration,
        description: description,
        allTrailsUrl: url,
        id: trail.id,
        images: files,
        jwt: _.get(session, "jwt"),
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
          <Box borderRadius={"0.3em"} backgroundColor={"#40916c"} padding="2em">
            <Text color={"black"} fontWeight={"700"}>
              Trail Successfully Updated
            </Text>
          </Box>
        ),
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
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
    title: Yup.string()
      .matches(/^.{1,40}$/gm, "Maximum character reached")
      .required("Title is Required"),
    location: Yup.string()
      .matches(/^.{1,40}$/gm, "Maximum character reached")
      .required("Location is Required"),
    difficulty: Yup.string().required("Difficulty is Required"),
    type: Yup.string().required("Trail Type is Required"),
    distance: Yup.number(),
    elevation: Yup.number(),
    description: Yup.string().required("Description is Required"),
    url: Yup.string().matches(
      /((https?):\/\/)?(www.)?alltrails.([a-z]+)\/(explore\/recording)/,
      "Enter valid AllTrails URL"
    ),
  });

  const convertDuration = (val: number) => {
    setSliderValue(humanizeDuration(val, { delimiter: " and ", round: true }));
    setDuration(val);
  };

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
              duration: trail.duration,
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
                {/* <Box my="2em">
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
                </Box> */}

                <Box>
                  <Heading fontSize={"1em"} mb="1em">
                    Duration
                  </Heading>
                  <Slider
                    aria-label="slider-ex-1"
                    defaultValue={values.duration}
                    step={1000}
                    min={0}
                    max={4.32e7}
                    onChange={(val) => convertDuration(val)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>

                  <Heading fontSize={"1em"} mb="1em">
                    {sliderValue === 0 ? "No Duration" : sliderValue}
                  </Heading>
                </Box>

                <TextField name="description" textbox={true} />
                {_.get(session, "user.name") !== "guest" && (
                  <TextField
                    placeholder="AllTrails URL"
                    type="url"
                    name="url"
                  />
                )}

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
