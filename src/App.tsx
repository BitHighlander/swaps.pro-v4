import React, { useEffect } from "react";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
// @ts-ignore
import { SwapProvider } from "swapkit-provider";
// @ts-ignore
import { PioneerProvider } from "@pioneer-platform/pioneer-react";
// @ts-ignore
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import { theme } from "lib/styles/theme";

// @ts-ignore
const ForceDarkMode = ({ children }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");
  }, [setColorMode]);

  return <>{children}</>;
};

const App = () => {
  return (
    <SwapProvider>
      <ChakraProvider theme={theme}>
        <ForceDarkMode>
          <Router>
            <Layout>
              <Routings />
            </Layout>
          </Router>
        </ForceDarkMode>
      </ChakraProvider>
    </SwapProvider>
  );
};

export default App;
