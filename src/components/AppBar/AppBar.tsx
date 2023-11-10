import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { config } from '@/configs/ohlcv.constant';
import { useRouter } from 'next/router';
import { StyledAppBar, StyledButton, boxStyles, typographyStyles } from './styles/AppBar.styles';


const pages = ['Trading', 'Derivaties', 'Funding'];

function ResponsiveAppBar(props: { coin: string }) {
    const router = useRouter()

    const handleBook = () => {
        router.push({
            pathname: '/order-book',
            query: {
                coin: props.coin,
            },
        })
    }

    const handleHome = () => {
        router.push('/')
    }

    return (
        <StyledAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={typographyStyles}
                        onClick={handleHome}
                    >
                        BITFINEX
                    </Typography>

                    <Box sx={boxStyles}>
                        {pages.map((page) => (
                            <StyledButton
                                key={page}
                            >
                                {page}
                            </StyledButton>
                        ))}
                        <StyledButton
                            onClick={handleBook}
                        >
                            BOOK
                        </StyledButton>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}
export default ResponsiveAppBar;
