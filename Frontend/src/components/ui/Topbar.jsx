// src/components/ui/Topbar.jsx
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { ColorModeContext } from '../../theme/ThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Topbar() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#041120' }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1,fontFamily:'serif' }}>
                    Library Management System
                </Typography>
                
                <IconButton color="inherit" sx={{ ml: 2 }}>
                    <AccountCircle />
                </IconButton>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            </Toolbar>
        </AppBar>
    );
}
