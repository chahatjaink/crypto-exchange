import { GroupedData } from "@/interface";
import fetchTickersData from "@/services/fetchTickersData";
import formatTickersData from "@/util/formatTickersData";
import { tickersActions } from "./tickerSlice";
import { AppDispatch } from ".";

export const getTickersData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchTickers = async () => {
      const tickerData = await fetchTickersData();
      const tickerGroupedData: GroupedData = formatTickersData(tickerData);
      return tickerGroupedData;
    };
    const tickers = await fetchTickers();
    dispatch(tickersActions.setTickers(tickers));
  };
};
