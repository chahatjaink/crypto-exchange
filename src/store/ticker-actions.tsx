import { TickerData } from "@/interface";
import fetchTickersData from "@/services/fetchTickersData";
import formatTickersData from "@/util/formatTickersData";
import { tickersActions } from "./tickerSlice";
import { AppDispatch } from ".";

export const getTickersData = () => {
  return async (dispatch: AppDispatch) => {
    const tickerData = await fetchTickersData();
    const tickerGroupedData: TickerData = formatTickersData(tickerData);
    dispatch(tickersActions.setTickers(tickerGroupedData));
  };
};
