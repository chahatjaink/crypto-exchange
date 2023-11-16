import { config } from "@/configs/ohlcv.constant"
import { AppBar, Box, Button } from "@mui/material"
import { styled } from "@mui/system"

export const StyledAppBar = styled(AppBar)(
 {
    backgroundColor: config.defaultColor 
 }   
)

export const typographyStyles =
{
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}

export const boxStyles = {
    flexGrow: 0,
    display: { xs: 'none', md: 'flex' }
}

export const StyledButton = styled(Button)(
    { my: 2, color: 'white', display: 'block' })