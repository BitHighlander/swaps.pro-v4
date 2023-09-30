import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { QuoteRoute, SwapKitApi } from "@pioneer-platform/swapkit-api";
import {UTXOEstimateFeeParams} from "@pioneer-platform/toolbox-utxo";
import {
  Amount,
  AssetAmount,
  AssetEntity,
} from "@pioneer-platform/swapkit-entities";
// @ts-ignore
import calculatingAnimation from "lib/assets/gif/calculating.gif";
// @ts-ignore
import { useSwap } from "swapkit-provider";

// @ts-ignore
const BeginSwap = ({ input, output, setRoute }) => {
  const { state } = useSwap();
  const { swapKit, walletData } = state;
  const [showGif, setShowGif] = useState(true);
  const [routes, setRoutes] = useState({});
  const [amountOut, setAmountOut] = useState("");
  const [path, setPath] = useState("");
  //build swap
  const buildSwap = async function () {
    try {
      //
      console.log("input: ", input);
      console.log("output: ", output);

      //get max spendable
      console.log("swapKit: ", swapKit);
      console.log("input.chain: ", input.chain);
      console.log("input.asset: ", input.asset.chain);
      //TODO placeholder memo?
      let feeParams:UTXOEstimateFeeParams = {
        from: input.address,
        memo: "THISISAPLACEHOLDERMEMOLARGERHTNEN64CHARS",
      };
      let maxSpendable = await swapKit.estimateMaxSendableAmount({chain:input.asset.chain,params:feeParams});
      console.log("maxSpendable: ", maxSpendable);
      console.log("maxSpendable: ", maxSpendable.amount().toString());
      let amountSat = parseInt(maxSpendable.amount().toString())
      console.log("maxSpendable: ", maxSpendable.decimal);
      // Calculate the divisor: 10^decimal
      let divisor = Math.pow(10, maxSpendable.decimal);

// Divide amountSat by the divisor
      let amountBase = amountSat / divisor;

      console.log("maxSpendable: final ", amountBase);
      //get min spendable

      // const sellAsset = new AssetAmount(input.asset, input.balance);
      // const buyAsset = new AssetAmount(output.asset, output.balance);
      // let sellAsset = new AssetEntity(input.asset.chain, input.asset.symbol);
      //let buyAsset = new AssetEntity(output.asset.chain, output.asset.symbol)

      const value = parseFloat(input.balance.toString());
      const amount = Amount.fromNormalAmount(amountBase);

      const quoteEntry = {
        sellAsset: input.symbol + "." + input.symbol,
        sellAmount: amount.assetAmount.toString(),
        buyAsset: output.symbol + "." + output.symbol,
        senderAddress: input.address,
        recipientAddress: output.address,
        slippage: "3",
      };

      try {
        console.log(quoteEntry);
        const { routes } = await SwapKitApi.getQuote(quoteEntry);
        console.log("routes: ", routes);
        setRoutes(routes);
        if (routes && routes[0]) {
          //select route0
          const route0 = routes[0];
          setRoute(route0);
          setAmountOut(route0.expectedOutput);
          setPath(route0.path);
        }
      } catch (e) {
        console.error(e);
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
          <Box as="span">Path: {path}</Box>

          <Box border="1px" borderRadius="md" p={4} mb={2} boxShadow="lg">
            You will receive {amountOut}
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
