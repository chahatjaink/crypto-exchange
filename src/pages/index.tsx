import React from "react";
import Header from "@/components/Header/Header";
import OhlcPage from "@/components/OhlcPage/OhlcPage";
import { MainStack } from "@/components/OhlcPage/ohlcPage.styles";

export default function MainPage() {
  return (
    <MainStack>
      <Header />
      <OhlcPage />
    </MainStack>
  );
}
