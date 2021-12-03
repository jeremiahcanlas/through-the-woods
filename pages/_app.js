import "../styles/globals.css";
import Layout from "../components/Layout";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={"dark"} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
