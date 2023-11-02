import { SelectInputProps } from "@mui/material/Select/SelectInput";

export type DropdownProps = {
    id: string;
    type: string;
    value: string;
    onChange: SelectInputProps<any>['onChange'];
};

export type BitfinexResponse = [number, [number, number, number]];
export type OrderData = [number, number, number];