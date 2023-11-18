import Header from "@/components/Header/Header";
import MainComponent from "@/components/MainComponent/MainComponent";
import { MainStack } from "@/util/ohlc.styles";
import { useSelector } from "react-redux";

export default function MainPage() {

    return (
        <MainStack>
            <Header/>
            <MainComponent  />
        </MainStack>
    )
}