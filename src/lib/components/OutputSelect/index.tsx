import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  HStack,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Spinner,
  Card,
} from "@chakra-ui/react";
import { Key, useEffect, useState } from "react";

// @ts-ignore
import { usePioneer } from "@pioneer-platform/pioneer-react";
// @ts-ignore
import { useSwap } from "swapkit-provider";
// @ts-ignore
import { THORCHAIN_NETWORKS, COIN_MAP_LONG } from "@pioneer-platform/pioneer-coins";
// @ts-ignore

// @ts-ignore
export default function OutputSelect({ setOutput, onClose }) {
  const { state: pioneerState } = usePioneer();
  const { state: swapKitState } = useSwap();
  const { swapKit, walletData } = swapKitState;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showOwnedAssets, setShowOwnedAssets] = useState(false);
  const [timeOut, setTimeOut] = useState(null);
  const itemsPerPage = 6;
  const [totalBlockchains, setTotalBlockchains] = useState(0);
  const [assets, setAssets] = useState([]);
  const [chains, setChains] = useState(THORCHAIN_NETWORKS);

  useEffect(() => {
    if (walletData) {
      console.log("walletData:", walletData);
      const allAssets = [];

      for (let i = 0; i < walletData.length; i++) {
        // console.log("walletData[i]:", walletData[i]);
        const balanceInfo = walletData[i];
        for (let j = 0; j < balanceInfo.balance.length; j++) {
          const balance = balanceInfo.balance[j];
          console.log("balance:", balance);
          const asset = {
            symbol: balance.asset.symbol,
            network: balance.asset.network,
            asset: balance.asset,
            image:
              "https://pioneers.dev/coins/" +
              COIN_MAP_LONG[balance.asset.chain.toLowerCase()] +
              ".png",
            balance: balance.assetAmount.toString()
          };
          console.log("asset:" , asset)
          //filter only primary
          if(asset.asset.type === "Native"){
            allAssets.push(asset);
          }
        }
      }
      // @ts-ignore
      setAssets(allAssets);
    }
  }, [walletData]);

  // @ts-ignore
  const handleSelectClick = async (asset) => {
    try {
      console.log("Select Asset!", asset);
      setOutput(asset);
      onClose();
      // Your logic here
    } catch (e) {
      console.error(e);
    }
  };
  // @ts-ignore
  const onSearch = async (searchQuery) => {
    try {
      // Your logic here
    } catch (e) {
      console.error(e);
    }
  };
  // @ts-ignore
  const fetchPage = async (pageIndex) => {
    try {
      // Your logic here
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack spacing={4}>
      <HStack spacing={2} alignItems="center">
        {chains.map((chain: { image: string | undefined; symbol: string | undefined; }, index: Key | null | undefined) => (
          <Box key={index} p={2} borderWidth="1px" borderRadius="md">
            <Avatar size="sm" src={chain.image} name={chain.symbol} />
          </Box>
        ))}
      </HStack>
      <InputGroup>
        {/* Search Input */}
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search assets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <Box overflowY="scroll" maxHeight="400px">
        {assets.map((asset: any, index: any) => (
          <Card
            key={index}
            onClick={() => handleSelectClick(asset)}
            p={2}
            m={2}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <HStack>
              <Avatar size="sm" src={asset?.image} name={asset?.symbol} />
              <Text>{asset?.symbol}</Text>
              <Text>{asset?.balance}</Text>
            </HStack>
          </Card>
        ))}
      </Box>
      <HStack mt={4}>
        <Button
          isDisabled={currentPageIndex === 0}
          onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
        >
          Previous Page
        </Button>
        <Button
          isDisabled={currentPage.length < itemsPerPage}
          onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
        >
          Next Page
        </Button>
      </HStack>
    </Stack>
  );
}
