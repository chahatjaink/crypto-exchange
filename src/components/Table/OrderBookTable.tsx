import OrderTable from "./OrderTable";
import useOrderBook from "@/util/hooks/orderBook";
import { InnerStack, StyledStack } from "./styles/OrderTable.styles";
import useAskBidData from "@/util/hooks/askBidData";
import { CoinState } from "@/interface";
import { useSelector } from "react-redux";
import React from "react";

export default function OrderBookTable() {
  const selectedCoin = useSelector((state: CoinState) => state.selectedCoin);
  const orderBook = useOrderBook(selectedCoin);
  const { askData, bidData } = useAskBidData(selectedCoin, orderBook);

  return (
    <StyledStack>
      <InnerStack>
        <OrderTable orderData={bidData} type="bid" />
      </InnerStack>
      <InnerStack>
        <OrderTable orderData={askData} type="ask" />
      </InnerStack>
    </StyledStack>
  );
}
