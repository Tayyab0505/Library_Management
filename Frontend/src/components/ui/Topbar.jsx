import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';

export default function Topbar() {
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
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2563EB', fontSize: 14, fontWeight: 600 }}>
                        {initials}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar >
    );
}