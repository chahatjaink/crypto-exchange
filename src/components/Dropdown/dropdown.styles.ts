import { styled } from '@mui/system';
import { Box, InputLabel } from '@mui/material';
import { config } from '@/configs/ohlcv.constant';

export const Container = styled(Box)({
    // position: "absolute",
    zIndex: 10,
})

export const Label = styled(InputLabel)({
    color: "white",
    fontWeight: "bold",
    fontSize: 20
})