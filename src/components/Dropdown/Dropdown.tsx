import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DropdownProps } from '@/interface';
import { config } from '../../../configs/ohlcv';

export default function Dropdown(props: DropdownProps) {
    const granularityOptions = config.granularityOptions;

    const tokenOptions = config.tokenOptions;

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
