import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { QuoteRoute, SwapKitApi } from '@pioneer-platform/swapkit-api';
import { Amount, AssetAmount, AssetEntity } from '@pioneer-platform/swapkit-entities';
// @ts-ignore
import calculatingAnimation from "lib/assets/gif/calculating.gif";
// @ts-ignore
import { useSwap } from "swapkit-provider";

// @ts-ignore
const BeginSwap = ({ input, output, setTransaction }) => {
  const { state } = useSwap();
  const { swapKit, walletData } = state;
  const [showGif, setShowGif] = useState(true);
  const [routes, setRoutes] = useState({});

  //build swap
  const buildSwap = async function () {
    try {
      //
      console.log("input: ", input);
      console.log("output: ", output);

      let sellAsset = new AssetAmount(input.asset, input.balance);
      let buyAsset = new AssetAmount(output.asset, output.balance);
      // let sellAsset = new AssetEntity(input.asset.chain, input.asset.symbol);
      //let buyAsset = new AssetEntity(output.asset.chain, output.asset.symbol)

      const value = parseFloat(input.balance.toString());
      const amount = Amount.fromNormalAmount(value);

      let quoteEntry = {
        sellAsset:input.network+"."+input.symbol,
        sellAmount: amount.assetAmount.toString(),
        buyAsset: output.symbol+"."+output.symbol,
        senderAddress:input.address,
        recipientAddress:output.address,
        slippage: '3',
      }

      //set the amount total balance
      // const quoteEntry:any = {
      //   sellAsset: "ETH",
      //   sellAmount: "0.1",
      //   buyAsset: "BTC",
      //   senderAddress: "0x123",
      //   recipientAddress: "0x123",
      //   slippage: "3",
      // }
      try{
        console.log(quoteEntry)
        const { routes } = await SwapKitApi.getQuote(quoteEntry);
        console.log("routes: ", routes);
        setRoutes(routes);

        //select route0
        const route0 = routes[0];
        setTransaction(route0);
      }catch(e){

      }
      // setRoutes(routes);
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
          <Box as="span">Path: {routes[0]?.path}</Box>

          <Box border="1px" borderRadius="md" p={4} mb={2} boxShadow="lg">
            You will receive {routes[0]?.expectedOutput}
          </Box>
          <Box border="1px" borderRadius="md" p={4} boxShadow="lg">
            {output.address} ({output.symbol})
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BeginSwap;
