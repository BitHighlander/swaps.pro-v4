import { extendTheme } from "@chakra-ui/react";

import { config } from "./config";
// @ts-ignore
import backgroundImage from "lib/assets/background/thorfox.webp"; // Adjust the path

type GlobalStyleProps = { colorMode: "light" | "dark" };

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Plus Jakarta Sans, sans-serif",
    body: "Plus Jakarta Sans, sans-serif",
  },
  components: {
    // baseStyle: {
    //   background: "black", // Set the background color to black
    // },
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        background: `url(${backgroundImage})`, // Replace with the actual image path
        backgroundSize: "cover", // This will stretch the image to cover the entire body
        backgroundRepeat: "no-repeat", // Prevent image tiling
        color: "white",
      },
      // Style for Webkit scrollbars
      "::-webkit-scrollbar": {
        width: "3px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "black",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "white",
        borderRadius: "0px",
      },
      // Style for Firefox scrollbars
      scrollbarWidth: "thin",
      scrollbarColor: "limegreen black",
    }),
  },
  colors: {
    // Define your custom colors here
    black: "#000", // Black color
    green: "#00FF00", // Green color
  },
  config,
});
