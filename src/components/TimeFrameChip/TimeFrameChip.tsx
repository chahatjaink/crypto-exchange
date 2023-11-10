import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { config } from '@/configs/ohlcv.constant';
import { MouseEventHandler } from 'react';

export default function TimeFrameChips(props: { onSelect: (label:string)=>void, selectedLabel: string | null }) {
    return (
        <Stack direction="row" gap={1}>
            {config.timeFrameOptions.map((label, labeIndex) =>
                <Chip sx={{ borderRadius: 0.5, border: `1px solid ${config.defaultColor}`, color: 'white' }}
                    key={labeIndex + label} label={label} onClick={() => props.onSelect(label)}
                    color={props.selectedLabel === label ? 'primary' : 'default'} />
            )}
            <p style={{position:'absolute', color: 'grey', right:20, fontSize:'14px'}}>
                X-Axis: Time<br/>
                Y-Axis: Price
            </p>
        </Stack>
    );
}