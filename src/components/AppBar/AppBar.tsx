import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { config } from '@/configs/ohlcv.constant';
import { useRouter } from 'next/router';


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
        <AppBar position="static" sx={{ backgroundColor: config.defaultColor }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={handleHome}
                    >
                        BITFINEX
                    </Typography>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={handleBook}
                        >
                            BOOK
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
