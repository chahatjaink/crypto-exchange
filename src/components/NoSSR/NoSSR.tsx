import dynamic from "next/dynamic";
import { StyledDiv } from "./styles/NoSSR.styles";
import React from "react";

const NoSSR = dynamic(() => import("../Table/TickerTable"), { ssr: false });

export default function Tickers() {
  return (
    <StyledDiv>
      <NoSSR />
    </StyledDiv>
  );
}
