import { GroupedData, Tickers } from "@/interface";
import fetchTickersData from "@/services/fetchTickersData";
import { useEffect, useState } from "react";
import formatTickersData from "../formatTickersData";

function useTickersData() {
    const [tickers, setTickers] = useState<GroupedData>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTickers = async () => {
            setIsLoading(true);
            const tickerData = await fetchTickersData();
            const tickerGroupedData: GroupedData = formatTickersData(tickerData);

            setIsLoading(false)
            setTickers(tickerGroupedData);
        };

        fetchTickers();
    }, []);

    return { tickers, isLoading };
}


export default useTickersData