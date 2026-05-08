import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../theme/ThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material';

export default function Topbar() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const email = localStorage.getItem('adminEmail') || 'Admin';
    const initials = email.charAt(0).toUpperCase();

    return (
        <AppBar position="fixed" elevation={0} sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: '#1E3A5F',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontFamily: 'serif', fontWeight: 700, letterSpacing: 0.5 }}>
                    Library Management System
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={colorMode.toggleColorMode} color="inherit" size="small">
                        {theme.palette.mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </IconButton>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2563EB', fontSize: 14, fontWeight: 600 }}>
                        {initials}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar >
    );
}