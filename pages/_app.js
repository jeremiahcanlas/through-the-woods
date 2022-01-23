// import "../styles/globals.css";
import Layout from "../components/Layout";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider as StoreProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider store={store}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={"dark"} />
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </ChakraProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
