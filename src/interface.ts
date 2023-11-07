import { SelectInputProps } from "@mui/material/Select/SelectInput";

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
