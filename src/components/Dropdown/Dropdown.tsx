import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DropdownProps } from '@/interface';

export default function Dropdown(props: DropdownProps) {
    const granularityOptions = [
        '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '1W', '14D', '1M'
    ];

    const tokenOptions = ['BTC', 'ETH', 'LTC'];

    return (
        <Box sx={{
            minWidth: 120, maxWidth: 150, position: "absolute",
            left: 10,
            backgroundColor: "grey",
            zIndex: 10,
        }}>
            <FormControl fullWidth>
                <InputLabel id={props.id} sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{props.type}</InputLabel>
                <Select
                    labelId={props.id}
                    id={props.id}
                    defaultValue={props.value}
                    value={props.value}
                    label={props.id}
                    onChange={props.onChange}
                >
                    {
                        props.type === 'Granularity' ?
                            (granularityOptions.map((option, optionIndex) => (
                                <MenuItem key={option + optionIndex} value={option}>
                                    {option}
                                </MenuItem>
                            )))
                            : (tokenOptions.map((option, optionIndex) => (
                                <MenuItem key={option + optionIndex} value={option}>
                                    {option}
                                </MenuItem>
                            )))
                    }
                </Select>
            </FormControl>
        </Box >
    );
}
