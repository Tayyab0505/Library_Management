import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Students', icon: <SchoolIcon />, path: '/students' },
    { label: 'Books', icon: <MenuBookIcon />, path: '/books' },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    background: '#1E3A5F',
                    color: '#fff',
                    borderRight: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}>

            <Toolbar />

            <List sx={{ flex: 1, px: 1, mt: 1 }} >
                {navItems.map(({ label, icon, path }) => {
                    const isActive = location.pathname === path;

                    return (
                        <ListItemButton
                            key={path} component={Link} to={path} sx={{
                                borderRadius: '10px', mb: 0.5, backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                                borderLeft: isActive ? '3px solid #60A5FA' : '3px solid transparent',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                            }} >

                            <ListItemIcon sx={{ color: isActive ? '#60A5FA' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                                {icon}
                            </ListItemIcon>

                            <ListItemText primary={label} primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                            }} />
                        </ListItemButton>
                    );
                })}
            </List>

            <Box sx={{ px: 1, pb: 2 }} >
                <ListItemButton onClick={handleLogout} sx={{
                    borderRadius: '10px', '&:hover': { backgroundColor: 'rgba(239,68,68,0.15)' },
                }}>
                    <ListItemIcon sx={{ color: '#FCA5A5', minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{ fontSize: 14, color: '#FCA5A5' }} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
}