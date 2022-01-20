// import "../styles/globals.css";
import Layout from "../components/Layout";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "../store";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={"dark"} />
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
