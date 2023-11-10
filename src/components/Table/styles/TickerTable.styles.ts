import { styled } from '@mui/system';
import { TableCell } from '@mui/material';
import { config } from '@/configs/ohlcv.constant';

export const StyledTableCell = styled(TableCell)({
    color: 'white',
    backgroundColor: config.defaultColor,
    border: 'none',
    padding:' 1px 5px',
})
