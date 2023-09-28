import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { QuoteRoute, SwapKitApi } from '@pioneer-platform/swapkit-api';
// @ts-ignore
import calculatingAnimation from "lib/assets/gif/calculating.gif";
// @ts-ignore
import { useSwap } from "swapkit-provider";

// @ts-ignore
const BeginSwap = ({ input, output }) => {
  const { state } = useSwap();
  const { swapKit, walletData } = state;
  const [showGif, setShowGif] = useState(true);

  //build swap
  const buildSwap = async function () {
    try {
      //
      console.log("input: ", input);
      console.log("output: ", output);



      // let quoteEntry = {
      //   sellAsset: input.asset.toString(),
      //     sellAmount: input.assetAmount.toString(),
      //   buyAsset: output.asset.toString(),
      //   senderAddress,
      //   recipientAddress,
      //   slippage: '3',
      // }

      //set the amount total balance
      // const quoteEntry:any = {
      //   sellAsset: "ETH",
      //   sellAmount: "0.1",
      //   buyAsset: "BTC",
      //   senderAddress: "0x123",
      //   recipientAddress: "0x123",
      //   slippage: "3",
      // }
      // const { routes } = await SwapKitApi.getQuote(quoteEntry);
      // console.log("routes: ", routes);

      //
      // swapKit.buildSwap({});

      //onDone
      setShowGif(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    buildSwap();
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
