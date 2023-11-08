import { GroupedData, Tickers } from "@/interface";
import fetchTickersData from "@/services/fetchTickersData";
import { useEffect, useState } from "react";

enum TickerProperty {
    SYMBOL = 0,
    BID = 1,
    BID_SIZE = 2,
    ASK = 3,
    ASK_SIZE = 4,
    DAILY_CHANGE = 5,
    DAILY_CHANGE_RELATIVE = 6,
    LAST_PRICE = 7,
    VOLUME = 8,
    HIGH = 9,
    LOW = 10,
}

function useTickersData(coin: string) {
    const [tickers, setTickers] = useState<GroupedData>();

    useEffect(() => {
        const fetchTickers = async () => {
            const tickerData = await fetchTickersData();
            const tickers: Array<Tickers> = tickerData.map((tickerRow: Array<number | string>) => {
                const volume:number= Number(tickerRow[TickerProperty.VOLUME]) * Number(tickerRow[TickerProperty.LAST_PRICE])
                const change24H: number=Number((Number(tickerRow[TickerProperty.DAILY_CHANGE_RELATIVE])*100).toFixed(2))
                return {
                    symbol: tickerRow[TickerProperty.SYMBOL],
                    bid: tickerRow[TickerProperty.BID],
                    bid_size: tickerRow[TickerProperty.BID_SIZE],
                    ask: tickerRow[TickerProperty.ASK],
                    ask_size: tickerRow[TickerProperty.ASK_SIZE],
                    daily_change: tickerRow[TickerProperty.DAILY_CHANGE],
                    change24H,
                    last_price: tickerRow[TickerProperty.LAST_PRICE],
                    volume,
                    high24H: tickerRow[TickerProperty.HIGH],
                    low24H: tickerRow[TickerProperty.LOW],
                }
            });
            const tickerGroupedData: GroupedData = {};

            tickers.forEach((ticker) => {
                const symbol = ticker.symbol;
                const coin = symbol.substring(1, 4);
                const currency = symbol.substring(4);

                if (!tickerGroupedData[coin]) {
                    tickerGroupedData[coin] = [];
                }
                tickerGroupedData[coin].push({ currency, ticker }); 
            });
			console.log("TCL: fetchTickers -> tickerGroupedData", tickerGroupedData)
            setTickers(tickerGroupedData);
        };

        fetchTickers();
    }, [coin]);

    return tickers;
}


export default useTickersData