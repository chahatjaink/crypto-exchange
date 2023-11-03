import { SelectInputProps } from "@mui/material/Select/SelectInput";

export type DropdownProps = {
    id: string;
    type: string;
    value: string;
    onChange: SelectInputProps<any>['onChange'];
};
