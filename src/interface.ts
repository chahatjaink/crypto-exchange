import { SelectInputProps } from "@mui/material/Select/SelectInput";

export type DropdownProps = {
    id: string;
    type: string;
    value: string;
    onChange: SelectInputProps<any>['onChange'];
};

export type BitfinexResponse = [number, Array<number>];
export type OrderData = {
    price: number,
    count: number,
    amount: number,
}
