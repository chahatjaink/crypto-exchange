import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { StyledAppBar, StyledButton, boxStyles, typographyStyles } from './styles/AppBar.styles';
import { useSelector } from 'react-redux';


const pages = ['Trading', 'Derivaties', 'Funding'];

function Header() {
    const router = useRouter()
    const coin= useSelector((state: any) => state.coin.coin)

    const handleBook = () => {
        router.push({
            pathname: '/order-book',
            query: {
                coin,
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
export default Header;
