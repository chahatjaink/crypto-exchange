import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DropdownProps } from '@/interface';
import { Container, Label } from './dropdown.styles';


export default function Dropdown(props: DropdownProps) {
    return (
        <Container>
            <FormControl sx={{ m: 1, minWidth: 50 }}>
                <Select
                    labelId={props.id}
                    id={props.id}
                    defaultValue={props.value}
                    value={props.value}
                    label={props.id}
                    onChange={props.onChange}
                    sx={{color:'grey'}}
                >
                    {
                        (props.options.map((option, optionIndex) => (
                            <MenuItem key={option + optionIndex} value={option} >
                                {option}
                            </MenuItem>
                        )))
                    }
                </Select>
            </FormControl>
        </Container>
    );
}
