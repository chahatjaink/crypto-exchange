import Header from "@/components/Header/Header";
import MainComponent from "@/components/MainComponent/MainComponent";
import { MainStack } from "@/util/ohlc.styles";

export default function MainPage() {
    return (
        <MainStack>
            <Header/>
            <MainComponent  />
        </MainStack>
    )
}