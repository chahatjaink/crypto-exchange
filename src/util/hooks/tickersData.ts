import { GroupedData } from "@/interface";
import fetchTickersData from "@/services/fetchTickersData";
import { useEffect, useState } from "react";
import formatTickersData from "../formatTickersData";

function useTickersData() {
    const [tickers, setTickers] = useState<GroupedData>();

    useEffect(() => {
        const fetchTickers = async () => {
            const tickerData = await fetchTickersData();
            const tickerGroupedData: GroupedData = formatTickersData(tickerData);
			console.log("TCL: fetchTickers -> tickerGroupedData", tickerGroupedData)

            setTickers(tickerGroupedData);
        };

        fetchTickers();
    }, []);

    return { tickers};
}


export default useTickersData