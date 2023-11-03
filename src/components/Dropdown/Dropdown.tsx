import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

export default function Dropdown(props: { id: string, value: string, onChange: SelectInputProps<any>['onChange'] }) {
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
                <InputLabel id={props.id} sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Granularity</InputLabel>
                <Select
                    labelId={props.id}
                    id="demo-simple-select"
                    value={props.value}
                    label={props.id}
                    onChange={props.onChange}
                >
                    {
                        props.id === 'granularity' ? (granularityOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))) : (tokenOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        )))
                    }
                </Select>
            </FormControl>
        </Box >
    );
}
