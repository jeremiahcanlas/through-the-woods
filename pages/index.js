import Header from "../components/Header";
import Nav from "../components/Nav";
import Meta from "../components/Meta";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      maxH="100%"
      h="100vh"
      minW="100%"
      p="0"
      flexDirection="column"
      justifyContent="center"
    >
      <Meta />
      <Header />
      <Nav />
    </Flex>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const cookies = nookies.get(ctx);

//   const json = JSON.stringify({
//     token: cookies.jwt,
//   });

//   if (cookies?.jwt) {
//     try {
//       // const response = await axios.get(`${server}/users/me`, {
//       //   headers: {
//       //     Authorization: `Bearer ${cookies.jwt}`,
//       //   },
//       // });

//       // https://stackoverflow.com/questions/65752932/internal-api-fetch-with-getserversideprops-next-js
//       const response = await axios.post(
//         "http://localhost:3000/api/user/me",
//         json,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const user = await response.data;

//       return {
//         props: { user, cookies },
//       };
//     } catch (e) {
//       console.log("ERRRROR FETCHING");
//     }
//   }

//   return {
//     props: {},
//   };
// };
