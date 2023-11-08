import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { Time } from "lightweight-charts";

export type DropdownProps = {
    id: string;
    type: string;
    value: string;
    options: Array<string>;
    onChange: SelectInputProps<any>['onChange'];
};

export type BitfinexResponse = [number, Array<number>]; //format and save change naming
export type OrderData = {
    price: number,
    count: number,
    amount: number,
}

export enum OrderDataIndex {
    Price = 0,
    Count = 1,
    Amount = 2,
}

export enum Order {
    Book = 1
}

export type timestampGranularity = {
    timestamp: number,
    granularity: string
}

export type OhlcLabelType = {
    open: number,
    high: number,
    low: number,
    close: number,
    time: Time
}

export type Tickers = {
    symbol: string,
    bid: number,
    bid_size: number,
    ask: number,
    ask_size: number,
    daily_change: number,
    change24H: number,
    last_price: number,
    volume: number,
    high24H: number,
    low24H: number
}

export interface TickerGroupedData {
    currency: string;
    ticker: Tickers;
}

export interface GroupedData {
    [coin: string]: TickerGroupedData[];
}