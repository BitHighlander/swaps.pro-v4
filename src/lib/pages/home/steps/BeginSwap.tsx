import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
// @ts-ignore
import calculatingAnimation from "lib/assets/gif/calculating.gif";

const BeginSwap = () => {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowGif(false);
    }, 4000); // 4 seconds timeout

    return () => clearTimeout(timeoutId); // Clear the timeout if the component is unmounted
  }, []);

  return (
    <Box>
      {showGif ? (
        <Box>
          Calculating Best Route...
          <img src={calculatingAnimation} alt="calculating" />
        </Box>
      ) : (
        <Box border="1px" borderRadius="md" p={4} boxShadow="lg">
          <Text fontWeight="bold">Rate</Text>
          <Text fontWeight="bold">Slippage</Text>
          <Box as="span">Provider Icon</Box>

          <Box border="1px" borderRadius="md" p={4} mb={2} boxShadow="lg">
            Address 1
          </Box>
          <Box border="1px" borderRadius="md" p={4} boxShadow="lg">
            Address 2
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BeginSwap;
