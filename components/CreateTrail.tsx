import {
  Container,
  Button,
  Stack,
  Box,
  Heading,
  InputRightElement,
  NumberInput,
  NumberInputField,
  IconButton,
  useToast,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
// import { setAlert, removeAlert } from "../features/alert";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import PageContainer from "./PageContainer";
import TextField from "./TextField";
import UploadFile from "./UploadFile";

import axios from "axios";
import * as Yup from "yup";
import { server } from "../server";

const CreateTrail = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  // const dispatch = useDispatch();
  const toast = useToast();

  const [images, setImages] = useState([]);

  // const clearAlert = () => {
  //   setTimeout(() => {
  //     dispatch(removeAlert());
  //   }, 3000);
  // };

  if (status === "loading") {
    return <p>Please Wait</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>NOT AUTHORIZED</p>;
  }

  const handleCreate = async (values) => {
    const {
      title,
      location,
      city,
      difficulty,
      type,
      rating,
      distance,
      elevation,
      days,
      hours,
      minutes,
      description,
      url,
    } = values;

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
        city: city,
        description: description,
        difficulty: difficulty,
        type: type,
        rating: rating,
        distance: parseInt(distance),
        elevation: parseInt(elevation),
        trailLength: {
          days: parseInt(days),
          hours: parseInt(hours),
          minutes: parseInt(minutes),
        },
        allTrailsUrl: url,
        images: files,
        jwt: session.jwt,
      });

      const response = await axios.post("/api/trail/create", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // dispatch(
      //   setAlert({
      //     msg: "Successfully posted!",
      //     alertType: "success",
      //   })
      // );

      toast({
        position: "top",
        // title: `Hello, ${session.username}!`,
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"#40916c"}
            padding="2em"
            mx="auto"
          >
            <Text color={"black"} fontWeight={"700"}>
              Successfully Posted
            </Text>
            {/* <Text color={"black"}>You successfully logged in.</Text> */}
          </Box>
        ),
        duration: 3000,
      });

      router.push(`/trails/${response.data.id}`);
    } catch (error) {
      // console.log(error);
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
            mx="auto"
          >
            <Text color={"black"} fontWeight={"700"}>
              Post error
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
    city: Yup.string().required("City is Required"),
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
      .required("AllTrails URL required"),
  });

  const trailTypes = ["Loop", "Out & Back", "Point to Point"];

  const stars = [1, 2, 3, 4, 5];

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
            city: "",
            difficulty: "",
            type: "",
            rating: 0,
            distance: 0,
            elevation: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            description: "",
            url: "",
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
              <TextField
                placeholder="Location (Exact Address)"
                name="location"
              />
              <TextField placeholder="City" name="city" />
              <Box my="2em">
                <Heading fontSize={"1em"} mb="1em">
                  Rating
                </Heading>
                {/* {console.log(values)} */}
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
                />
              </Box>
              <Stack direction={"row"} spacing="6em" my="2em">
                <Box>
                  <Heading fontSize={"1em"} mb="1em">
                    Distance (km)
                  </Heading>

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
              <TextField placeholder="AllTrails URL" type="url" name="url" />

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
                <Stack direction="column">
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    Clear
                  </Button>
                  <Link href={"/trails"} passHref>
                    <Button size="sm" disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </Link>
                </Stack>
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
